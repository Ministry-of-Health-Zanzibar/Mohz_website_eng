import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { NewsService } from '../../../services/news/news.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { MinistrySystemComponent } from "../../components/System/ministry-system/ministry-system.component";
import { TeamLeaderComponent } from "../../components/TeamLeader/team-leader/team-leader.component";
import { AnnoucentComponent } from "../../components/annoucent/annoucent.component";
import { NewsComponent } from "../../components/news/news.component";
import { OurServiceComponent } from "../../components/our-service/our-service.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";

// ✅ Define the interface
interface News {
  title: string;
  date: string; // API should return date as a string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MinistrySystemComponent, TeamLeaderComponent, AnnoucentComponent, NewsComponent, OurServiceComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  latestNews: string[] = [];

  constructor(
    private wowService: NgwWowService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.wowService.init();
    this.fetchLatestNews();
  }

  fetchLatestNews() {
    this.newsService.getAllNews().pipe(
      map((newsArray: News[]) => {
        console.log("Fetched News Data:", newsArray); 
  
        return newsArray.filter((news: News) => {
          const newsDate = new Date(news.date);
          const today = new Date();
          const fourDaysAgo = new Date();
          // fourDaysAgo.setDate(today.getDate() - 4);
          return newsDate >= fourDaysAgo;
        });
      })
    ).subscribe(filteredNews => {
      console.log("Filtered News Data:", filteredNews); 
      this.latestNews = filteredNews.map((news: News) => news.title);
    });
  }
  
}
