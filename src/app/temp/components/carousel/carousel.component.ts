import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerService } from '../../../services/banners/banner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TeamService } from '../../../services/teams/team.service';
import { Team } from '../../../Model/Team';
import { environment } from '../../../../environments/environment.prod';
import { AnnouncementService } from '../../../services/announcements/announcement.service';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnDestroy {
  public isLoading!: boolean;
  public banners!: any;
  public teams: any;
  public leftColumn: any[] = [];
  public rightColumn: any[] = [];
  public bannerImageUrl!: string;
  ministrySystems: any;
  imageBaseUrl = environment.imageUrl;
  lastCount = 0;
  announcements: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private bannerService: BannerService,
    private teamService: TeamService,
    private annoucementService: AnnouncementService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.annoucementService
      .getAllPublicAnnouncements()
      .subscribe((response) => {
        const data = response.data || [];
        this.announcements = data;
        this.lastCount = data.length;
      });

    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.annoucementService.getAllPublicAnnouncements()),
      )
      .subscribe({
        next: (response) => {
          const data = response.data || [];

          if (data.length > this.lastCount) {
            this.announcements = data;
            this.lastCount = data.length;
          }
        },
        error: (err) => console.error('Error fetching announcements:', err),
      });

    this.getAllBanners();
    this.getAllTeams();
  }

  getPhotoFilename(fullPath: string | null | undefined): string {
    if (!fullPath) return '';
    return fullPath.split('/').pop() || '';
  }
  // Fetch all
  getAllBanners(): void {
    this.bannerService.getBanners().subscribe((response) => {
      if (response?.data) {
        // Filter out deleted records (assuming deleted records have a 'deleted_at' property)
        this.banners = response.data.filter(
          (banner: any) => !banner.deleted_at,
        );
      }
    });
  }

  public getAllTeams() {
    this.teamService.getAllPublicTeams().subscribe(
      (response: { data: Team[] }) => {
        const allTeams: Team[] = response.data;

        // Find specific positions accurately
        const waziri =
          allTeams.find(
            (member) => member.professional.toLowerCase() === 'waziri',
          ) || null;

        const naibuWaziri =
          allTeams.find(
            (member) => member.professional.toLowerCase() === 'naibu waziri',
          ) || null;

        const katibuMkuu =
          allTeams.find(
            (member) => member.professional.toLowerCase() === 'katibu mkuu',
          ) || null;

        const mkurugenzi =
          allTeams.find(
            (member) => member.professional.toLowerCase() === 'mkurugenzi',
          ) || null;

        // Ensure the left column displays Waziri first, then Naibu Waziri
        this.leftColumn = [waziri, naibuWaziri].filter(Boolean);

        // Ensure the right column includes Katibu Mkuu, Mkurugenzi, and at most 2 other members
        const selectedLeaders = [
          waziri,
          naibuWaziri,
          katibuMkuu,
          mkurugenzi,
        ].filter(Boolean);
        const otherMembers = allTeams.filter(
          (member) => !selectedLeaders.includes(member),
        );

        this.rightColumn = [katibuMkuu, mkurugenzi, ...otherMembers]
          .filter(Boolean)
          .slice(0, 2);
      },
      (error) => {},
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToAnnouncements() {
    this.router.navigate(['/temp/home/more-annoucement']);
  }
}
