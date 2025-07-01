import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-read-more-events',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './read-more-events.component.html',
  styleUrl: './read-more-events.component.css',
})
export class ReadMoreEventsComponent implements OnInit {
  public events: any;
  public recentEventsList: any[] = [];
  public currentEventId: any = null;
  public readMore = 'Read More';
  imageBaseUrl = environment.imageUrl;

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const eventId = params['id'];
      if (eventId) {
        this.currentEventId = eventId;
        this.getEventData(eventId);
      }
    });
    this.getAllEvents();
  }

  public getEventData(id: any): void {
    this.postService.getPublicPostsByTypeId(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.events = response.data;
        } else {
          console.log(response.message);
        }
      },
      (error: HttpErrorResponse) => console.error(error.error.message)
    );
  }

  public getAllEvents(): void {
    this.postService.getPublcEventsPosts().subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.recentEventsList = response.data;
        }
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  }

  public findEventById(id: any): void {
    this.getEventData(id);
    this.currentEventId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

 
}
