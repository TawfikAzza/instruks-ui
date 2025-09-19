import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../core/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isEdit = false;
  catId?: string;  // GUID

  form = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private categories: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(pm => {
        const id = pm.get('id');
        this.isEdit = !!id;
        this.catId = id ?? undefined; // keep GUID string

        if (this.isEdit && this.catId) {
          this.categories.getById(this.catId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: c => this.form.patchValue({ name: c.name }),
              error: () => this.snack.open('Failed to load category', 'Close', { duration: 3000 })
            });
        }
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const name = this.form.value.name ?? '';

    const req = (this.isEdit && this.catId)
      ? this.categories.update(this.catId, name) // GUID string id
      : this.categories.create(name);

    req.subscribe({
      next: () => {
        this.snack.open(`Category ${this.isEdit ? 'updated' : 'created'}`, 'Close', { duration: 2500 });
        this.router.navigate(['/categories']);
      },
      error: () => this.snack.open('Save failed', 'Close', { duration: 3000 })
    });
  }

  cancel(): void {
    this.router.navigate(['/categories']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
