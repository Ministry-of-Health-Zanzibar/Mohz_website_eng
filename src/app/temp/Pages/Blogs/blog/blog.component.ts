import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { PostService } from '../../../../services/posts/post.service';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
     MatButtonModule,
      MatIconModule,
      RouterModule
    ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  newses: any;
  public isLoading!: boolean;
  public events: any;
  public isEventLoading!: boolean;
  public readMore = 'Read More';
  constructor(
    private newsService: NewsService,
     private eventService: PostService,
      private router: Router){}
  ngOnInit(): void {
    this.getAllNeews();
    this.getEventPosts();
  
  }

   public getAllNeews(): void {
        this.isLoading = true;
        this.newsService.getAllPublicNews().subscribe(
          (response: any) => {
            this.newses = response.data;
            console.log('NEWS: ', response.data);
            this.isLoading = false;
          },
          (errorResponse: HttpErrorResponse) => {
            this.isLoading = false;
            console.log(errorResponse.error.message);
          }
        );
      }
    
    
        // Kupunguza ukubwa wa text
        public truncateNewsDescription(description: string, words: number): string {
          if (!description) return '';
          const wordArray = description.split(' ');
          if (wordArray.length <= words) return description;
          return wordArray.slice(0, words).join(' ') + '...';
        }
    
        
        public truncateTitle(description: string, words: number): string {
          if (!description) return '';
          const wordArray = description.split(' ');
          if (wordArray.length <= words) return description;
          return wordArray.slice(0, words).join(' ') + '...';
        }
    
        // Get news by Id
        public findNewsById(id: any): void {
          this.newsService.findNewsById(id).subscribe(
            (response: any) => {
              // id = 'page';
              this.router.navigate(['/temp/main/news', id]);
              // console.log('NEWS: ', response.data);
            },
            (errorResponse: HttpErrorResponse) => {
              console.log(errorResponse.error.message);
            }
          );
        }
    
    
        // Fetch events
        public getEventPosts(): void {
          this.isEventLoading = true;
          this.eventService.getEventPosts().subscribe(
            (response: any) => {
              this.events = response.data;
              // console.log('EVENTS: ', response.data);
              this.isEventLoading = false;
            },
            (errorResponse: HttpErrorResponse) => {
              this.isEventLoading = false;
              console.log(errorResponse.error.message);
            }
          );
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
