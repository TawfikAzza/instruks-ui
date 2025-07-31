import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { InstruksListComponent } from './instruks-list/instruks-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    CategoryListComponent,
    InstruksListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Angular Material modules
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class FeaturesModule { }
