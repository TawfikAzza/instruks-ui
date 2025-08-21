// instruks-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InstruksService } from '../../core/instruks.service';
import { Instruks } from '../../core/models/instruks.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../core/category.service';
import { CategoryDto } from '../../core/models/category.model';
import Quill from 'quill';
@Component({
  selector: 'app-instruks-list',
  templateUrl: './instruks-list.component.html',
  styleUrls: ['./instruks-list.component.css']
})
export class InstruksListComponent implements OnInit, OnDestroy {
  instruksList: Instruks[] = [];
  categories: CategoryDto[] = [];


  newInstruks: Partial<Instruks> = {
    title: '',
    description: '',
    content: '',
    categoryId: ''
  };

  editingInstruks: Instruks | null = null;

  constructor(
    private service: InstruksService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadInstruks();
    this.loadCategories();
  }
  ngAfterViewInit(): void {
    const quill = new Quill('#editor-container', {
      theme: 'snow',
      placeholder: 'Write your instructions...',
      modules: {
        toolbar: [
          [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],  // Font family + size
          ['bold', 'italic', 'underline', 'strike'],                   // Formatting
          [{ color: [] }, { background: [] }],                         // Text color/background
          [{ script: 'sub' }, { script: 'super' }],                    // Subscript/superscript
          [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],  // Headers, quotes, code
          [{ list: 'ordered' }, { list: 'bullet' },                    // Lists
            { indent: '-1' }, { indent: '+1' }],                         // Indentation
          [{ direction: 'rtl' }, { align: [] }],                       // RTL + alignment
          ['link', 'image', 'video'],                                  // Media
          ['clean']                                                    // Remove formatting
        ]
      }
    });

    // Optional: Sync with Angular model
    quill.on('text-change', () => {
      this.newInstruks.content = quill.root.innerHTML;
    });
  }
  ngOnDestroy(): void {

  }

  loadInstruks() {
    this.service.getAll().subscribe({
      next: data => this.instruksList = data,
      error: () => this.snackBar.open('Failed to load instruks', 'Close', { duration: 3000 })
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => this.snackBar.open('Failed to load categories', 'Close', { duration: 3000 })
    });
  }

  add() {
    if (!this.newInstruks.title?.trim()) return;

    this.service.create(this.newInstruks).subscribe({
      next: () => {
        this.snackBar.open('Instruks created', 'Close', { duration: 2000 });
        this.newInstruks = { title: '', description: '', content: '', categoryId: '' };
        this.loadInstruks();
      },
      error: () => this.snackBar.open('Failed to create instruks', 'Close', { duration: 3000 })
    });
  }

  edit(instruks: Instruks) {
    this.editingInstruks = { ...instruks };
  }

  saveEdit() {
    if (!this.editingInstruks) return;

    this.service.update(this.editingInstruks.id, this.editingInstruks).subscribe({
      next: () => {
        this.snackBar.open('Instruks updated', 'Close', { duration: 2000 });
        this.editingInstruks = null;
        this.loadInstruks();
      },
      error: () => this.snackBar.open('Update failed', 'Close', { duration: 3000 })
    });
  }

  cancelEdit() {
    this.editingInstruks = null;
  }

  delete(instruks: Instruks) {
    if (!confirm(`Delete "${instruks.title}"?`)) return;

    this.service.delete(instruks.id).subscribe({
      next: () => {
        this.snackBar.open('Instruks deleted', 'Close', { duration: 2000 });
        this.loadInstruks();
      },
      error: () => this.snackBar.open('Delete failed', 'Close', { duration: 3000 })
    });
  }
}
