import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { InstruksService } from '../../core/instruks.service';
import { Category, CategoryService } from '../../core/category.service';
import { Instruks } from '../../core/models/instruks.model';

@Component({
  selector: 'app-instruks-form',
  templateUrl: './instruks-form.component.html',
  styleUrls: ['./instruks-form.component.css']
})
export class InstruksFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  instruksId?: string;     // GUID
  categoryId?: string;     // GUID
  isEdit = false;
  categories: Category[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    content: [''],
    categoryId: this.fb.control<string | null>(null, Validators.required) // <-- string | null
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private svc: InstruksService,
    private categoriesSvc: CategoryService
  ) {}

  ngOnInit(): void {
    // Load categories
    this.categoriesSvc.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cats) => (this.categories = cats),
        error: () => this.snack.open('Failed to load categories', 'Close', { duration: 3000 })
      });

    // Read params (no Number(...) coercions)
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(pm => {
        const idParam = pm.get('id');
        const catParam = pm.get('categoryId');

        this.isEdit = !!idParam;
        this.instruksId = idParam ?? undefined;      // GUID string
        this.categoryId = catParam ?? undefined;     // GUID string

        if (this.categoryId) {
          this.form.patchValue({ categoryId: this.categoryId });
        }

        if (this.isEdit && this.instruksId) {
          this.svc.getById(this.instruksId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (i) => {
                this.form.patchValue({
                  title: i.title,
                  description: i.description ?? '',
                  content: i.content ?? '',
                  categoryId: i.categoryId     // GUID string
                });
              },
              error: () => this.snack.open('Failed to load instruks', 'Close', { duration: 3000 })
            });
        }
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const dto: Partial<Instruks> = {
      title: raw.title ?? '',
      description: raw.description ?? '',
      content: raw.content ?? '',
      categoryId: raw.categoryId!  // GUID string guaranteed by validator
    };

    const req = (this.isEdit && this.instruksId)
      ? this.svc.update(this.instruksId, dto)
      : this.svc.create(dto);

    req.subscribe({
      next: () => {
        this.snack.open(`Instruks ${this.isEdit ? 'updated' : 'created'}`, 'Close', { duration: 2500 });
        this.router.navigate(['/categories', dto.categoryId, 'instruks']);
      },
      error: () => this.snack.open('Save failed', 'Close', { duration: 3000 })
    });
  }

  cancel(): void {
    const catId = this.form.get('categoryId')?.value ?? this.categoryId;
    if (catId) {
      this.router.navigate(['/categories', catId, 'instruks']);
    } else {
      this.router.navigate(['/categories']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
