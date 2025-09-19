import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { AuthDialogComponent } from './pages/auth-dialog/auth-dialog/auth-dialog.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail/property-detail.component';
import { PropertyFormComponent } from './pages/property-form/property-form/property-form.component';
import { AuthGuard as A } from './core/guards/auth.guard';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: AuthDialogComponent},
  {path: 'register', component: AuthDialogComponent},
  {path: 'property/:id', component: PropertyDetailComponent, canActivate: [A]},
  {path: 'property-form', component: PropertyFormComponent},
  {path: 'property-form/:id', component: PropertyFormComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
