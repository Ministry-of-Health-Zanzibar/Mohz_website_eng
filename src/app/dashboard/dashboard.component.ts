import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ToastService } from '../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService,
    public userAuthService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    const user = this.userAuthService.getUserFromLocalStorage();
    console.log(user);
    if (user && user.full_name) {
      this.username = user.full_name;
    } else {
      this.username = 'Guest';
    }
  }

  public logOut(): void {
    this.authService.logOut();
    this.toastService.toastSuccess('You have been successfully log out.');
    this.router.navigateByUrl('/auth/login');
  }
}
