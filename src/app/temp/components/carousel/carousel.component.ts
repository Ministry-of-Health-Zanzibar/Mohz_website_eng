import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../services/banners/banner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TeamService } from '../../../services/teams/team.service';
import { Team } from '../../../Model/Team';

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
teams: any;
public leftColumn: any[] = [];
public rightColumn: any[] = [];


  constructor(private bannerService: BannerService, private teamService:TeamService) {}

  ngOnInit(): void {
    this.getAllBanners();
    this.getAllTeams();
  }

  // public getAllBanners(): void {
  //   this.bannerService.getAllBanners().subscribe(
  //     (response: any) => {
  //       if (response?.data) {
  //         console.log(response.data);
  //         this.banners = response.data.filter((banners:any) => !banners.deletede_at)
  //         console.log('Filtered banners:', this.banners);
  //       } 
          
       
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       console.log(errorResponse.error.message);
  //     }
  //   );
  // }

  // Fetch all ministry systems excluding deleted ones
  getAllBanners(): void {
    this.bannerService.getAllBanners().subscribe(
      (response) => {
        if (response?.data) {
          // Filter out deleted records (assuming deleted records have a 'deleted_at' property)
          this.banners = response.data.filter((banner: any) => !banner.deleted_at);
          console.log('Filtered systems:', this.banners);
        }
      },
      (error) => console.error('Error fetching ministry systems:', error)
    );
  }

 public getAllTeams() {
  this.teamService.getAllTeams().subscribe((response: { data: Team[] }) => {
    const allTeams: Team[] = response.data;

    // Tafuta Waziri, Naibu Waziri, Katibu Mkuu, na Mkurugenzi
    const waziri = allTeams.find(member => member.professional.toLowerCase().includes("waziri")) || null;
    const naibuWaziri = allTeams.find(member => member.professional.toLowerCase().includes("naibu waziri")) || null;
    const katibuMkuu = allTeams.find(member => member.professional.toLowerCase().includes("katibu mkuu")) || null;
    const mkurugenzi = allTeams.find(member => member.professional.toLowerCase().includes("mkurugenzi")) || null;

    // Epuka dublicate kwa kuondoa null values mapema
    const selectedMembers = [waziri, naibuWaziri, katibuMkuu, mkurugenzi].filter(member => member !== null);

    // Pata members wengine ambao hawako kwenye list ya viongozi waliotajwa
    const otherMembers = allTeams.filter(member => !selectedMembers.includes(member));

    // Pangilia Left Column (Waziri na Naibu Waziri)
    this.leftColumn = [waziri, naibuWaziri].filter(Boolean);

    // Pangilia Right Column (Katibu Mkuu, Mkurugenzi)
    this.rightColumn = [katibuMkuu, mkurugenzi, ...otherMembers].filter(Boolean).slice(0, 2);
    
  }, (error) => {
    console.error("Error fetching teams:", error);
  });
}

  
  
}
