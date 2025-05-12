import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-more-annoucement',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './more-annoucement.component.html',
  styleUrl: './more-annoucement.component.css'
})
export class MoreAnnoucementComponent  implements OnInit{
  announcements : any;
  public isLoading!: boolean;
  constructor(private annoucementService:AnnouncementService){}
  ngOnInit(): void {
    this.getAllAnnouncements();
    
  }


  //  public getAllAnnouncements(): void {
  //     this.annoucementService.getAllAnnouncements().subscribe((response: any) => {
  //         this.announcements = response.data;
  //         console.log(response.data);
  //       },
  //       (errorResponse: HttpErrorResponse) => {
  //         console.log(errorResponse.error.message);
  //       },
  //     );
  //   }



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
  

}
