import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { NewsService } from '../../../../services/news/news.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.css',
})
export class AllNewsComponent implements OnInit {
  newses: any[] = [];
  leftColumnNews: any[] = [];
  rightColumnNews: any[] = [];
  isLoading = true;
  readMore = 'Read More';
  imageBaseUrl = environment.imageUrl;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  public getAllNews(): void {
    this.newsService.getAllPublicNews().subscribe(
      (response) => {
        if (response?.data) {
          this.newses = response.data.filter((news: any) => !news.deleted_at);

          // Split into two columns
          this.leftColumnNews = this.newses.filter((_, index) => index % 2 === 0);
          this.rightColumnNews = this.newses.filter((_, index) => index % 2 !== 0);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching news:', error);
        this.isLoading = false;
      }
    );
  }

  public truncateText(text: string, words: number): string {
    if (!text) return '';
    const wordArray = text.split(' ');
    if (wordArray.length <= words) return text;
    return wordArray.slice(0, words).join(' ') + '...';
  }

  public findNewsById(id: any): void {
    this.newsService.findPublicNewsById(id).subscribe(
      () => {
        this.router.navigate(['/temp/main/news', id]);
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
      }
    );
  }
}
