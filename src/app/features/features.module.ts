import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { InstruksListComponent } from './instruks-list/instruks-list.component';
import {MatIconModule} from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryFormComponent } from './category-form/category-form.component';
import { InstruksFormComponent } from './instruks-form/instruks-form.component';
import { InstruksByCategoryComponent } from './instruks-by-category/instruks-by-category.component';

@NgModule({
  declarations: [
    LoginComponent,
    CategoryListComponent,
    InstruksListComponent,
    ConfirmDialogComponent,
    CategoryFormComponent,
    InstruksFormComponent,
    InstruksByCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule
  ],
  exports: [
    LoginComponent,
    CategoryListComponent,
    InstruksListComponent,
    ConfirmDialogComponent // optional if not routed directly
  ]
})
export class FeaturesModule { }
