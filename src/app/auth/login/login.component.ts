import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { ToastService } from '../../services/toast/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public showLoading!: boolean;
  public passwordVisible: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigateByUrl('/dashboard/home');
    }
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  public login(user: any): void {
    this.showLoading = true;
    this.authService.login(user.email, user.password).subscribe(
      (response: any) => {
        if (response && response.error) {
          this.showLoading = false;
          this.toastService.toastError('Server returned an error');
          console.log('Server returned an error:', response.error);
        } else {
          if (response.statusCode != 401 && response.data.statusCode == 200) {
            const token = response.data.token;
            this.authService.saveToken(token!);
            if (response.data.login_status === '1') {
              this.authService.addUserToLocalStorage(response.data);
              this.authService.setPermissions(response.data.permissions);
              this.toastService.toastSuccess(
                'You have been login successfully.'
              );
              this.router.navigateByUrl('/dashboard/home');
              this.showLoading = false;
            } else {
              console.log('change password');
              this.showLoading = false;
              this.toastService.toastWarning(
                'Please change the password first'
              );
              this.router.navigateByUrl('auth/set-new-password');
            }
          } else {
            this.showLoading = false;
            this.toastService.toastError(response.message);

            this.router.navigateByUrl('/auth/login');
          }
        }

        // const token = response.data.token;
        // this.authService.saveToken(token!);
        this.authService.addUserToLocalStorage(response.data);
        // this.toastService.toastSuccess('You have been login successfully.');
        // this.router.navigateByUrl('/dashboard/home');
        // this.showLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError(errorResponse.error.message);
        this.showLoading = false;
      }
    );
  }
}
