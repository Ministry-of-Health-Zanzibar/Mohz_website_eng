import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-announcement-details',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './view-announcement-details.component.html',
  styleUrl: './view-announcement-details.component.css',
})
export class ViewAnnouncementDetailsComponent implements OnInit {
  public announcement: any = { files: [] }; // Hifadhi faili kama array ya objects

  constructor(
    private announcementService: AnnouncementService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAnnouncementData();
  }

  public getAnnouncementData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.announcementService.findAnnouncementById(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.announcement = response.data;

          // Badilisha document_urls kuwa array ya objects yenye name na url
          this.announcement.files = response.data.document_urls
            ? response.data.document_urls.map((fileUrl: string) => ({
                name: this.extractFileName(fileUrl),
                url: fileUrl,
              }))
            : [];
        } else {
          this.toastService.toastError('An error occurred while processing');
        }
      },
      (error) => {
        console.error('Error fetching announcement:', error);
        this.toastService.toastError('Failed to fetch announcement details.');
      }
    );
  }

  private extractFileName(fileUrl: string): string {
    return fileUrl.split('/').pop() || 'Unknown File';
  }
}
