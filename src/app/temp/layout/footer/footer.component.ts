import { Component, OnInit } from '@angular/core';
import { SiteLinkService } from '../../../services/site-links/site-link.service';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  siteLink: any[] = []

  constructor(private siteLinkService:SiteLinkService, private toastService: ToastService){}

  ngOnInit(): void {
    this.getAllSiteLinks();
      
  }
    email = 'info@mohz.go.tz'


     public getAllSiteLinks(): void {
        this.siteLinkService.getPublicAllSitelinks().subscribe((response: any) => {
            this.siteLink = response.data;
            console.log(response.data);
          },
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
          },
        );
      }

}
