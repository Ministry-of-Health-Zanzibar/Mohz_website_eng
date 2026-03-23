import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../../services/announcements/announcement.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit, OnDestroy {
  showNotification = true;
  lastCount = 0;
  announcements: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private announcementService: AnnouncementService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.announcementService
      .getAllPublicAnnouncements()
      .subscribe((response) => {
        const data = response.data || [];
        this.announcements = data;
        this.lastCount = data.length;
      });

    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.announcementService.getAllPublicAnnouncements()),
      )
      .subscribe({
        next: (response) => {
          const data = response.data || [];

          if (data.length > this.lastCount) {
            this.announcements = data;
            this.lastCount = data.length;
            this.triggerNotification();
          }
        },
        error: (err) => console.error('Error fetching announcements:', err),
      });
  }

  triggerNotification() {
    this.showNotification = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showNotification = false;
      this.cdr.detectChanges();
    }, 5000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToAnnouncements() {
    this.router.navigate(['/temp/home/more-annoucement']);
  }
}
