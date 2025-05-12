import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ToastService } from '../services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private toastService: ToastService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.authService.isUserLoggedIn()) {
        return true;
      } else {
        this.toastService.toastError('You need to log in to access this page');
        this.router.navigateByUrl('/auth/login');
        return false;
      }
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (state.url === '/login') {
  //     return true; // Allow access to login page
  //   }
  
  //   if (this.authService.isUserLoggedIn()) {
  //     return true;
  //   } else {
  //     this.toastService.error('You need to log in to access this page');
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }
  
}
