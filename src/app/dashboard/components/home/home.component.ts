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

    constructor(private userAuthService:AuthenticationService){}
    ngOnInit(): void { 
      this.getUserDetails();
    
    }

    getUserDetails() {
      this.userAuthService.getUserFromLocalStorage().subscribe(
        (data: any[]) => { 
          this.user = data;
          console.log("Users fetched successfully:", this.user);
        },
        
      );
    }


  }
