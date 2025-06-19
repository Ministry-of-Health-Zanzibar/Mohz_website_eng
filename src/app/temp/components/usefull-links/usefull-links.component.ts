import { Component, OnInit } from '@angular/core';
import { SiteLinkService } from '../../../services/site-links/site-link.service';
import { ToastService } from '../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usefull-links',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usefull-links.component.html',
  styleUrls: ['./usefull-links.component.css'],
})
export class UsefullLinksComponent implements OnInit {
  siteLink: any[] = [];

  constructor(
    private siteLinkService: SiteLinkService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAllSiteLinks();
  }

  public getAllSiteLinks(): void {
    this.siteLinkService.getPublicAllSitelinks().subscribe(
      (response: any) => {
        console.log('Site links received:', response);
        this.siteLink = Array.isArray(response?.data) ? response.data : [];
      },
      (errorResponse: HttpErrorResponse) => {
        console.error('Error fetching site links:', errorResponse.message);
      }
    );
  }
}
