import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { InstruksService } from '../../core/instruks.service';
import { Instruks } from '../../core/models/instruks.model';

@Component({
  selector: 'app-instruks-by-category',
  templateUrl: './instruks-by-category.component.html',
  styleUrls: ['./instruks-by-category.component.css']
})
export class InstruksByCategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  categoryId!: string;   // GUID
  displayedColumns = ['title', 'description', 'actions'];
  dataSource = new MatTableDataSource<Instruks>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private svc: InstruksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(pm => {
        const idParam = pm.get('id') || pm.get('categoryId') || pm.get('catId');
        if (!idParam) {
          this.snack.open('Invalid category id', 'Close', { duration: 2500 });
          this.router.navigate(['/categories']);
          return;
        }
        this.categoryId = idParam;  // keep as string (GUID)
        this.load();
      });
  }

  load(): void {
    this.svc.getByCategory(this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: rows => {
          this.dataSource = new MatTableDataSource(rows);
          this.dataSource.sort = this.sort;
        },
        error: () => this.snack.open('Failed to load instruks', 'Close', { duration: 3000 })
      });
  }

  create(): void {
    this.router.navigate(['/instruks/new', this.categoryId]);
  }

  edit(row: Instruks): void {
    this.router.navigate(['/instruks/edit', row.id]);
  }

  delete(id: string): void {     // GUID
    this.svc.delete(id).subscribe({
      next: () => {
        this.snack.open('Deleted', 'Close', { duration: 2000 });
        this.load();
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 })
    });
  }

  back(): void {
    this.router.navigate(['/categories']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
