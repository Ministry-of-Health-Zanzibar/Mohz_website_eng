import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { NewsService } from '../../../../services/news/news.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './view-news-details.component.html',
  styleUrl: './view-news-details.component.css',
})
export class ViewNewsDetailsComponent implements OnInit {
  public news: any;
  public newsData: { title: string; value: string; isImage?: boolean }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private newsService: NewsService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getNewsData();
  }

  public getNewsData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.newsService.findNewsById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        // console.log(response.data);
        this.news = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occured while processing');
        // this.toastService.toastError(response.message);
      }
    });
  }

  // private populateTableData(): void {
  //   this.newsData = [
  //     { title: 'Title', value: this.news?.news_title || '' },
  //     { title: 'Description', value: this.news?.news_descriptions || '' },
  //     { title: 'Image', value: this.news?.image_urls || '', isImage: true },
  //   ];
  // }

  private populateTableData(): void {
    this.newsData = [
      { title: 'Title', value: this.news?.news_title || '' },
      { title: 'Description', value: this.news?.news_descriptions || '' },
    ];
  
    if (this.news?.image_urls?.length) {
      this.news.image_urls.forEach((imageUrl: string) => {
        this.newsData.push({ title: 'Image', value: imageUrl, isImage: true });
      });
    }
  }
  
}
