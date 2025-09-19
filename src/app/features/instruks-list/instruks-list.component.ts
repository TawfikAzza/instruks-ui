import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { InstruksService } from '../../core/instruks.service';
import { Instruks } from '../../core/models/instruks.model';

@Component({
  selector: 'app-instruks-list',
  templateUrl: './instruks-list.component.html',
  styleUrls: ['./instruks-list.component.css']
})
export class InstruksListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  displayedColumns = ['title', 'categoryId', 'actions'];
  dataSource = new MatTableDataSource<Instruks>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private svc: InstruksService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.svc.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: rows => {
          this.dataSource = new MatTableDataSource(rows);
          this.dataSource.sort = this.sort;
        },
        error: () => this.snack.open('Failed to load instruks', 'Close', { duration: 3000 })
      });
  }

  edit(row: Instruks): void {
    this.router.navigate(['/instruks/edit', row.id]); // row.id is GUID
  }

  delete(row: Instruks): void {
    this.svc.delete(row.id).subscribe({
      next: () => {
        this.snack.open('Deleted', 'Close', { duration: 2000 });
        this.load();
      },
      error: () => this.snack.open('Delete failed', 'Close', { duration: 3000 })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
