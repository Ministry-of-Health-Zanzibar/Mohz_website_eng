import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'set-new-password',
    loadComponent: () =>
      import('./set-new-password/set-new-password.component').then(
        (c) => c.SetNewPasswordComponent
      ),
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
