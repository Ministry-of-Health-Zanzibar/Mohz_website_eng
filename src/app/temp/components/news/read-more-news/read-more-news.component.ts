import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-read-more-news',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './read-more-news.component.html',
  styleUrl: './read-more-news.component.css'
})
export class ReadMoreNewsComponent implements OnInit {
  public news: any;
  public readMore = 'Read More';
  public recentNewsList: any[] = [];
  public currentNewsId: any = null;
  imageBaseUrl = environment.imageUrl;

  constructor(
    private newsService: NewsService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      const newsId = params['id'];
      if (newsId) {
        this.currentNewsId = newsId;
        this.getNewsData(newsId);
      }
    });

    this.getAllNews();
  }

  public getNewsData(newsId: any): void {
    this.newsService.findPublicNewsById(newsId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.news = response.data;
          this.currentNewsId = newsId;
        } else {
          console.log(response.message);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse.error.message);
      }
    );
  }

  public getAllNews(): void {
    this.newsService.getAllPublicNews().subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.recentNewsList = response.data;
        }
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  public findNewsById(id: any): void {
    this.getNewsData(id); // Load content in same page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
