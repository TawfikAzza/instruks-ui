import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { InstruksListComponent } from './features/instruks-list/instruks-list.component'; // keep for now
import { CategoryFormComponent } from './features/category-form/category-form.component';
import { InstruksFormComponent } from './features/instruks-form/instruks-form.component';
import { InstruksByCategoryComponent } from './features/instruks-by-category/instruks-by-category.component';

import { AuthGuard } from './core/auth/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Categories
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },         // list all
  { path: 'categories/new', component: CategoryFormComponent, canActivate: [AuthGuard] },     // create
  { path: 'categories/:id/edit', component: CategoryFormComponent, canActivate: [AuthGuard] },// edit

  // Instruks by category (new dedicated page)
  { path: 'categories/:id/instruks', component: InstruksByCategoryComponent, canActivate: [AuthGuard] },

  // Instruks add/edit (dedicated pages)
  { path: 'instruks/new/:categoryId', component: InstruksFormComponent, canActivate: [AuthGuard] },
  { path: 'instruks/edit/:id', component: InstruksFormComponent, canActivate: [AuthGuard] },

  // (Legacy all-in-one page - optional to keep during transition)
  { path: 'instruks', component: InstruksListComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
