import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PartnerService } from '../../../../services/partners/partner.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-team-leader',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ], 
  templateUrl: './team-leader.component.html',
  styleUrl: './team-leader.component.css',
})
export class TeamLeaderComponent implements OnInit {
  teams: any;
  partners! : any [];
  public isLoading!: boolean;
  isAllPartnersPage: boolean = false;
  imageBaseUrl = environment.imageUrl;
  showMarquee: boolean = false;
 
  constructor(
    private partnerService:PartnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPartners();
    
    setTimeout(() => {
    this.showMarquee = true;
  }, 3000);
   
  }


  public getAllPartners(): void {
    this.isLoading = true;
    this.partnerService.getPublicAllPartners().subscribe(
      (response: any) => {
        this.partners = response.data;
        console.log('PARTNER: ', response.data);
        this.isLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(errorResponse.error.message);
      }
    );
  }

  moreDetails(){
    this.router.navigate(['/temp/main/partners'])
  }


 

}
