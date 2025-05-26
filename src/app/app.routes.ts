import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { BaseComponent } from '@pages/base/base.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  { 
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
    ]
  }
];
