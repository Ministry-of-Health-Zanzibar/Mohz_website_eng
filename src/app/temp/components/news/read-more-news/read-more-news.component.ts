import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-more-news',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule, MatIconModule],
  templateUrl: './read-more-news.component.html',
  styleUrl: './read-more-news.component.css'
})
export class ReadMoreNewsComponent implements OnInit {
  public news: any;

  constructor(
    private newsService: NewsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
      this.getNewsData();
  }


  public getNewsData(): void {
    const newsId = this.activateRoute.snapshot.params['id'];
    this.newsService.findNewsById(newsId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          console.log('NEWS DATA: ', response.data);
          this.news = response.data;
        } else {
          console.log(response.message);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error.message);
      }
    );
  }


  public backToHomePage(): void {
    this.router.navigateByUrl('/temp/main');
  }
}
