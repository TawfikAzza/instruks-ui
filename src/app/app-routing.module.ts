import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { InstruksListComponent } from './features/instruks-list/instruks-list.component';
import { AuthGuard } from './core/auth/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
  { path: 'instruks', component: InstruksListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
