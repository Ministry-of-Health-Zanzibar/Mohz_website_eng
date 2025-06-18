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


interface News {
  title: string;
  date: string; 
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MinistrySystemComponent, TeamLeaderComponent, AnnoucentComponent, NewsComponent, OurServiceComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {
  latestNews: string[] = [];

  constructor(
  
  ) {}

  
  
}
