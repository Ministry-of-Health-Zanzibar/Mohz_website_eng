import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLinkService } from '../../../services/site-links/site-link.service';


@Component({
  selector: 'app-usefull-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usefull-links.component.html',
  styleUrls: ['./usefull-links.component.css'],
})
export class UsefullLinksComponent implements OnInit {
  siteLinks: any[] = [];

  constructor(private siteLinkService: SiteLinkService) {}

  ngOnInit(): void {
    this.fetchLinks();
  }

  fetchLinks(): void {
    this.siteLinkService.getPublicAllSitelinks().subscribe({
      next: (res) => {
        this.siteLinks = res?.data || [];
       
      },
     
    });
  }
}
