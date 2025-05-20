import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-publication-links',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './publication-links.component.html',
  styleUrl: './publication-links.component.css'
})
export class PublicationLinksComponent implements OnInit {
  public documentUrl = environment.imageUrl + 'posts/documents/'
onView() {
throw new Error('Method not implemented.');
}
  publications: any[] = [];
  selectedPublication: any = null;

  constructor(private publicationService: PostService) {}

  ngOnInit(): void {
    this.getPublicationPosts();
    
  }

  public getPublicationPosts(): void {
    this.publicationService.getPublciPublicationPosts().subscribe(response => {
      console.log('Publication List', response); // Debugging log

      if (response && response.data && Array.isArray(response.data)) {
        this.publications = response.data; // Hakikisha data ni array
      } else {
        this.publications = []; // Ikiwa hakuna data, epuka makosa
      }
    }, error => console.error('Error fetching publications:', error));
  }


  
  public getPostsByType(typeId: number): void {
    this.publicationService.getPostByType(typeId).subscribe(response => {
      console.log('Posts by Type:', response);
      
      if (response && response.data && Array.isArray(response.data)) {
        this.publications = response.data; 
      } else {
        this.publications = [];
      }
    }, error => console.error('Error fetching posts by type:', error));
  }

  public selectPublication(publication: any): void {
    this.selectedPublication = publication;
  }


 
    
  }
 
