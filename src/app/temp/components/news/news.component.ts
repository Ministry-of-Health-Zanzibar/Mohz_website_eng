import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news/news.service';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/posts/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';



@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  newses: any;
  public isLoading!: boolean;
  public events: any;
  public isEventLoading!: boolean;
  public readMore = 'Read More';
  postData: any;
  imageBaseUrl = environment.imageUrl;

  constructor(
    private newsService: NewsService, 
    private postService:PostService,
    private router: Router, 
   
  ) {}

  ngOnInit(): void {
    this.getAllNeews();
    this.getEventPosts();
    console.log("Event Data:", this.events);
  }

  //Get All News
public getAllNeews(): void {
  this.newsService.getAllPublicNews().subscribe(
    (response) => {
      if (response?.data) {
        // Filter out deleted records (assuming deleted records have a 'deleted_at' property)
        this.newses = response.data.filter((news: any) => !news.deleted_at);
       
      }
    },
    
  );
}

public getEventPosts(): void {
  this.isEventLoading = true;
  this.postService.getPublcEventsPosts().subscribe(
    (response) => {
      if (response?.data) {
        
        this.events = response.data.filter((event: any) => !event.deleted_at);
      } else {
        this.events = [];
      }
      this.isEventLoading = false;
    },
    (error: HttpErrorResponse) => {
      this.isEventLoading = false;
      // Optionally handle error
      console.error('Error fetching event posts:', error);
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
      this.newsService.findPublicNewsById(id).subscribe(
        (response: any) => {
          
          this.router.navigate(['/temp/main/news', id]);
          
        },
    
      );
    }

    
    //  Get news by Id
     public findEventById(id: any): void {
      console.log("ID: ", id)
      this.postService.getPublicPostsByTypeId(id).subscribe(
        (response: any) => {
          // id = 'page';
          this.router.navigate(['/temp/main/read-events', id]);
          
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse.error.message);
        }
      );}

    // Fetch events
    // public getEventPosts(): void {
    //   this.isEventLoading = true;
    //   this.postService.getPublcEventsPosts().subscribe(
    //     (response: any) => {
    //       this.events = response.data;
          
    //       this.isEventLoading = false;
    //     },
    //     (errorResponse: HttpErrorResponse) => {
    //       this.isEventLoading = false;
    //       // console.log(errorResponse.error.message);
    //     }
    //   );
    // }

  

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
