  import { Component, OnInit } from '@angular/core';
  import { AuthenticationService } from '../../../services/auth/authentication.service';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [ 
      CommonModule,
      RouterModule 
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
  })
  export class HomeComponent implements OnInit {
    
    user: any[] = [];
    username: string = '';

    constructor(private userAuthService:AuthenticationService){}
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
    
    

  }
