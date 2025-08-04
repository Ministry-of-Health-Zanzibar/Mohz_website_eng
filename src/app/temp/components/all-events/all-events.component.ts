import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { PostService } from '../../../services/posts/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css',
})
export class AllEventsComponent implements OnInit {
  public events: any[] = [];
  public paginatedEvents: any[] = [];
  public pageSize = 6;
  public currentPage = 0;
  public totalEvents = 0;
  public isEventLoading = false;
  public readMore = 'Read More';
  imageBaseUrl = environment.imageUrl;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  public getAllEvents(): void {
    this.isEventLoading = true;
    this.postService.getPublcEventsPosts().subscribe(
      (response) => {
        if (response?.data) {
          this.events = response.data.filter((e: any) => !e.deleted_at);
          this.totalEvents = this.events.length;
          this.paginateEvents();
        }
        this.isEventLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching events:', error);
        this.isEventLoading = false;
      }
    );
  }

  public paginateEvents(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEvents = this.events.slice(start, end);
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateEvents();
  }

  public findEventById(id: any): void {
    this.router.navigate(['/temp/home/read-events', id]);
  }

  public truncateText(text: string, words: number): string {
    if (!text) return '';
    const wordArray = text.split(' ');
    if (wordArray.length <= words) return text;
    return wordArray.slice(0, words).join(' ') + '...';
  }

  public truncateEventTitle(description: string, words: number): string {
    return this.truncateText(description, words);
  }

  public truncateEventDescription(description: string, words: number): string {
    return this.truncateText(description, words) + ' Read More';
  }
}
