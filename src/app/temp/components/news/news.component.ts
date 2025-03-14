import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news/news.service';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/posts/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';



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

public getAllNeews(): void {
  this.newsService.getAllNews().subscribe(
    (response) => {
      if (response?.data) {
        // Filter out deleted records (assuming deleted records have a 'deleted_at' property)
        this.newses = response.data.filter((news: any) => !news.deleted_at);
        console.log('Filtered systems:', this.newses);
      }
    },
    (error) => console.error('Error fetching ministry systems:', error)
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

     // Get news by Id
     public findEventById(id: any): void {
      this.postService.findPostById(id).subscribe(
        (response: any) => {
          // id = 'page';
          this.router.navigate(['/temp/main/read-events', id]);
          // console.log('NEWS: ', response.data);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse.error.message);
        }
      );}

      // fetchPost(id: any) {
      //   this.postService.findPostById(id).subscribe(
      //     data => {
      //       this.postData = data;
      //       console.log('Data:', data);
      //     },
      //     error => {
      //       console.error('Error:', error);
      //     }
      //   );
      // }
    

    

   

    

    
    

 

    // Fetch events
    public getEventPosts(): void {
      this.isEventLoading = true;
      this.postService.getEventPosts().subscribe(
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

    // View
  public navigateToPostDetails(data: any): void {
    this.router.navigate(['/temp/main/read-events', data.post_id]);
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
