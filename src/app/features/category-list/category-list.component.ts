import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../core/category.service';
import { Category } from '../../core/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  dataSource = new MatTableDataSource<Category>();
  newCategoryName = '';
  editingCategory: Category | null = null;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },
      error: () => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    });
  }

  add() {
    if (!this.newCategoryName.trim()) return;

    this.service.create(this.newCategoryName).subscribe({
      next: () => {
        this.snackBar.open('Category created', 'Close', { duration: 2000 });
        this.newCategoryName = '';
        this.load();
      },
      error: () => this.snackBar.open('Failed to create category', 'Close', { duration: 3000 })
    });
  }

  edit(category: Category) {
    this.editingCategory = { ...category };
  }

  saveEdit() {
    if (!this.editingCategory) return;

    this.service.update(this.editingCategory.id, this.editingCategory.name).subscribe({
      next: () => {
        this.snackBar.open('Category updated', 'Close', { duration: 2000 });
        this.editingCategory = null;
        this.load();
      },
      error: () => this.snackBar.open('Update failed', 'Close', { duration: 3000 })
    });
  }

  cancelEdit() {
    this.editingCategory = null;
  }

  delete(category: Category) {
    if (!confirm(`Are you sure you want to delete "${category.name}"?`)) return;

    this.service.delete(category.id).subscribe({
      next: () => {
        this.snackBar.open('Category deleted', 'Close', { duration: 2000 });
        this.load();
      },
      error: () => this.snackBar.open('Delete failed', 'Close', { duration: 3000 })
    });
  }
}
