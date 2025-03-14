import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/events/event.service';
import { PostService } from '../../../services/posts/post.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-read-more-events',
  standalone: true,
  imports: [
    CommonModule,
        RouterModule,
        MatButtonModule, MatIconModule
  ],
  templateUrl: './read-more-events.component.html',
  styleUrl: './read-more-events.component.css'
})
export class ReadMoreEventsComponent implements OnInit {
  public events: any;


  constructor(
     private eventService: PostService, 
        private activateRoute: ActivatedRoute,
        private router: Router

   )
   {}
  ngOnInit(): void {
    this.getEventData();
    
  }



   public getEventData(): void {
      const eventId = this.activateRoute.snapshot.params['id'];
      this.eventService.findPostById(eventId).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            console.log('EVENT DATA: ', response.data);
            this.events = response.data;
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
