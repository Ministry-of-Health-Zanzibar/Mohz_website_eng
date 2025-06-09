import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { PostService } from '../../../../services/posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { environment } from '../../../../../environments/environment.prod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  newses: any[] = [];
  events: any[] = [];
  paginatedNews: any[] = [];
  paginatedEvents: any[] = [];

  isLoading = false;
  isEventLoading = false;
  readMore = 'Read More';
  imageBaseUrl = environment.imageUrl;

  constructor(
    private newsService: NewsService,
    private eventService: PostService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllNeews();
    this.getEventPosts();
  }

  getAllNeews(): void {
    this.isLoading = true;
    this.newsService.getAllPublicNews().subscribe(
      (response: any) => {
        this.newses = response.data || [];
        this.paginatedNews = this.newses.slice(0, 5); // default page 1
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.error(error.error.message);
      }
    );
  }

  getEventPosts(): void {
    this.isEventLoading = true;
    this.eventService.getPublcEventsPosts().subscribe(
      (response: any) => {
        this.events = response.data || [];
        this.paginatedEvents = this.events.slice(0, 5);
        this.isEventLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isEventLoading = false;
        console.error(error.error.message);
      }
    );
  }

  // Pagination handlers
  onNewsPageChange(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.paginatedNews = this.newses.slice(start, end);
  }

  onEventPageChange(event: PageEvent): void {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.paginatedEvents = this.events.slice(start, end);
  }

  truncateTitle(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    return wordArray.length <= words ? description : wordArray.slice(0, words).join(' ') + '...';
  }

  truncateNewsDescription(description: string, words: number): string {
    return this.truncateTitle(description, words);
  }

  truncateEventDescription(description: string, words: number): string {
    return this.truncateTitle(description, words) + '...Read More';
  }

  findNewsById(id: any): void {
    this.router.navigate(['/temp/main/news', id]);
  }

  navigateToPostDetails(event: any): void {
    this.router.navigate(['/temp/main/read-events', event.post_id]);
  }
}
