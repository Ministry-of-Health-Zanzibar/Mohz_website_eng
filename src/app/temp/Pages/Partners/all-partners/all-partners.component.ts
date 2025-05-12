import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../../../../services/partners/partner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-partners',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './all-partners.component.html',
  styleUrl: './all-partners.component.css'
})
export class AllPartnersComponent implements OnInit {
  isLoading!: boolean;
  partners: any []= [];

  constructor(private partnerService:PartnerService){}
  ngOnInit(): void {
    this.getAllPartners();
      
  }

   public getAllPartners(): void {
      this.isLoading = true;
      this.partnerService.getAllPartners().subscribe(
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

}
