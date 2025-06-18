import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OurServiceService } from '../../../../services/our-service/our-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-read-more-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './read-more-services.component.html',
  styleUrl: './read-more-services.component.css'
})
export class ReadMoreServicesComponent implements OnInit {
 public ourServices: any;
  constructor(private ourService:OurServiceService, private activatedRoute:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.getOurServiceData();
   
  }


   public getOurServiceData(): void {
      const newsId = this.activatedRoute.snapshot.params['id'];
      this.ourService.findPublicOurServiceById(newsId).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            // console.log('NEWS DATA: ', response.data);
            this.ourServices = response.data;
          } else {
            console.log(response.message);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse.error.message);
        }
      );
    }

}
