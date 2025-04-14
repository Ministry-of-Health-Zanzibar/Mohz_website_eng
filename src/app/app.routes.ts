import { Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'temp',
    loadChildren: () => import('./temp/temp.module').then((m) => m.TempModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '',
    redirectTo: 'temp',
    pathMatch: 'full',
  },
  
  {
    path: '**',
    loadChildren: () => import('./errors/errors.module').then((m) => m.ErrorsModule),
  },
];
