import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { PostService } from '../../../services/posts/post.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css',
})
export class AllEventsComponent implements OnInit {
  leftColumnEvents: any[] = [];
  rightColumnEvents: any[] = [];
  public isLoading!: boolean;
  public events: any[] = [];
  public isEventLoading!: boolean;
  public readMore = 'Read More';
  postData: any;
  imageBaseUrl = environment.imageUrl;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  public getAllEvents(): void {
    this.postService.getPublcEventsPosts().subscribe(
      (response) => {
        if (response?.data) {
          this.events = response.data.filter(
            (events: any) => !events.deleted_at
          );

          // Split into two columns
          this.leftColumnEvents = this.events.filter(
            (_, index) => index % 2 === 0
          );
          this.rightColumnEvents = this.events.filter(
            (_, index) => index % 2 !== 0
          );
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
      }
    );
  }

  //  Get news by Id
  public findEventById(id: any): void {
    console.log('ID: ', id);
    this.postService.getPublicPostsByTypeId(id).subscribe(
      (response: any) => {
        // id = 'page';
        this.router.navigate(['/temp/main/read-events', id]);
        // console.log('NEWS: ', response.data);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
      }
    );
  }

  public truncateText(text: string, words: number): string {
    if (!text) return '';
    const wordArray = text.split(' ');
    if (wordArray.length <= words) return text;
    return wordArray.slice(0, words).join(' ') + '...';
  }
  // Kupunguza ukubwa wa text
    public truncateEventTitle(description: string, words: number): string {
      if (!description) return '';
      const wordArray = description.split(' ');
      if (wordArray.length <= words) return description;
      return wordArray.slice(0, words).join(' ') + '...';
    }

    public truncateEventDescription(description: string, words: number): string {
      if (!description) return '';
      const wordArray = description.split(' ');
      if (wordArray.length <= words) return description;
      return wordArray.slice(0, words).join(' ') + '...Read More';
    }
}
