import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../../services/announcements/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-annoucent',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './annoucent.component.html',
  styleUrl: './annoucent.component.css'
})
export class AnnoucentComponent implements OnInit {
 public announcements: any;
  public isLoading!: boolean;

  constructor(
    private annoucementService: AnnouncementService,
  ) {}


  ngOnInit(): void {
      this.getAllAnnouncements();
  }

  public getAllAnnouncements(): void {
    this.isLoading = true;
    this.annoucementService.getAllAnnouncements().subscribe(
      (response: any) => {
        if (response?.data) {
          // Chuja matangazo yaliyofutwa
          this.announcements = response.data
            .filter((announcement: any) => !announcement.deleted_at)
            .map((announcement: any) => ({
              ...announcement,
              document_urls: Array.isArray(announcement.document_urls)
                ? announcement.document_urls.map((url: string) => ({
                    url,
                    name: url.split('/').pop() || 'Unknown File'
                  }))
                : []
            }));
          console.log('Matangazo yaliyofanyiwa uchujaji:', this.announcements);
        }
        this.isLoading = false;
      },
      (errorResponse: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Hitilafu katika kupakia matangazo:', errorResponse.error.message);
      }
    );
  }
  
   // Kupunguza ukubwa wa text
   public truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }

}
