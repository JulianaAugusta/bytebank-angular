import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { BaseComponent } from '@pages/base/base.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full' 
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
    ]
  }
];
