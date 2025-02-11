import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OurServiceService } from '../../../services/our-service/our-service.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './our-service.component.html',
  styleUrl: './our-service.component.css'
})
export class OurServiceComponent implements OnInit{
  
  ourServiceData: any = [];
  public readMore = 'Read More';
  constructor(private ourService:OurServiceService, private router:Router){}
  ngOnInit(): void {
    this.getOurServiceData()
    
  }

  
  getOurServiceData(): void {
    this.ourService.getAllOurServices().subscribe(
      (response: any) => {
        this.ourServiceData = response.data; 
        console.log("OurserviceData", response)
      },
     
      (error: any) => {
        console.error('Error fetching Our Service data:', error);
      }
    );
  
  }

  public truncateTitle(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }


  // Get news by Id
      public findServiceById(id: any): void {
        this.ourService.findOurServiceById(id).subscribe(
          (response: any) => {
            // id = 'page';
            this.router.navigate(['/temp/main/read-our-service', id]);
            // console.log('Service: ', response.data);
          },
          (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.message);
          }
        );
      }


}
