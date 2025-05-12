import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-user-details',
  standalone: true,
  imports: [
    RouterModule, MatButtonModule, MatIconModule, CommonModule
  ],
  templateUrl: './view-user-details.component.html',
  styleUrl: './view-user-details.component.css'
})
export class ViewUserDetailsComponent implements OnInit{
  public user: any;

  constructor(
        private  authService:AuthenticationService,
        private activateRoute: ActivatedRoute,
        private toastService: ToastService
  ){

  }

  ngOnInit(): void {
    this.getUserData();
      
  }


  public getUserData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    console.log('Fetching user with ID:', id);  
    
    this.authService.findUserById(id).subscribe(
      (response: any) => {
        console.log('Response data:', response); 
        if (response.statusCode === 200 && response.data) {
          this.user = response.data[0];  
          console.log('User data:', this.user);  
        } else {
          this.toastService.toastError('An error occurred while processing');
        }
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
        this.toastService.toastError('Failed to fetch user details.');
      }
    );
  }
  

}
