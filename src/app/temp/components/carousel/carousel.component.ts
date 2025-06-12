import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../services/banners/banner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TeamService } from '../../../services/teams/team.service';
import { Team } from '../../../Model/Team';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit {
public banners!: any;
 public teams: any
public leftColumn: any[] = [];
public rightColumn: any[] = [];
public bannerImageUrl!: string;
ministrySystems: any;
imageBaseUrl = environment.imageUrl;



  constructor(private bannerService: BannerService, private teamService:TeamService) {}

  ngOnInit(): void {
    this.getAllBanners();
    this.getAllTeams();
  }

  getPhotoFilename(fullPath: string | null | undefined): string {
  if (!fullPath) return '';
  return fullPath.split('/').pop() || '';
}
  // Fetch all 
  getAllBanners(): void {
    this.bannerService.getBanners().subscribe(
      (response) => {
        if (response?.data) {
          // Filter out deleted records (assuming deleted records have a 'deleted_at' property)
          this.banners = response.data.filter((banner: any) => !banner.deleted_at);
          // console.log('Filtered systems:', this.banners);
        }
      },
      (error) => console.error('Error fetching ministry systems:', error)
    );
  }

  public getAllTeams() {
    this.teamService.getAllPublicTeams().subscribe((response: { data: Team[] }) => {
      const allTeams: Team[] = response.data;
  
      // Find specific positions accurately
      const waziri = allTeams.find(member => 
        member.professional.toLowerCase() === "waziri") || null;
      
      const naibuWaziri = allTeams.find(member => 
        member.professional.toLowerCase() === "naibu waziri") || null;
  
      const katibuMkuu = allTeams.find(member => 
        member.professional.toLowerCase() === "katibu mkuu") || null;
  
      const mkurugenzi = allTeams.find(member => 
        member.professional.toLowerCase() === "mkurugenzi") || null;
  
      // Ensure the left column displays Waziri first, then Naibu Waziri
      this.leftColumn = [waziri, naibuWaziri].filter(Boolean);
  
      // Ensure the right column includes Katibu Mkuu, Mkurugenzi, and at most 2 other members
      const selectedLeaders = [waziri, naibuWaziri, katibuMkuu, mkurugenzi].filter(Boolean);
      const otherMembers = allTeams.filter(member => !selectedLeaders.includes(member));
  
      this.rightColumn = [katibuMkuu, mkurugenzi, ...otherMembers].filter(Boolean).slice(0, 2);
  
    }, (error) => {
      console.error("Error fetching teams:", error);
    });
  }
  
  
}
