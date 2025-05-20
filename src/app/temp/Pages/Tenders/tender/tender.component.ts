
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../services/posts/post.service';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-tender',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule
  ], 
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {
  tenders: any[] = [];
  public documentUrl = environment.imageUrl + 'posts/documents/'

  constructor(private tenderService: PostService) {}

  ngOnInit(): void {
    this.getAllTenders();
  }
  getAllTenders() {
    this.tenderService.getPublcTenderPosts().subscribe(
      (response) => {
        console.log("API Response:", response); 
        this.tenders = response.data || []; 
      },
      (error) => {
        console.error('Error fetching tenders:', error);
      }
    );
  }
  
  
  
  previewPost(filepath: string) {
    window.open(filepath, '_blank');
  }
}
