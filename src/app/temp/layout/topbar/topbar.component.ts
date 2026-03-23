import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AnnouncementService } from '../../../services/announcements/announcement.service';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit, OnDestroy {
  email = 'info@mohz.go.tz';
  announcements: any[] = [];
  lastCount = 0;
  private destroy$ = new Subject<void>();

  constructor(private announcementService: AnnouncementService,private router:Router) {}

  ngOnInit(): void {
    this.announcementService.getAllPublicAnnouncements().subscribe((response) => {
      const data = response.data || [];
      this.announcements = data;
      this.lastCount = data.length;
    });

    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.announcementService.getAllPublicAnnouncements())
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
   goToAnnouncements() {
    this.router.navigate(['/temp/home/more-annoucement']);
  }
}
