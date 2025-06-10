import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../../environments/environment.prod';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-publication-links',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatPaginatorModule,MatIconModule],
  templateUrl: './publication-links.component.html',
  styleUrl: './publication-links.component.css',
})
export class PublicationLinksComponent implements OnInit {
  public documentUrl = environment.imageUrl + 'posts/documents/';

  publications: any[] = [];
  selectedPublication: any = null;

  paginatedPublications: any[] = [];
  pageSize = 5;
  currentPage = 0;

  constructor(private publicationService: PostService) {}

  ngOnInit(): void {
    this.getPublicationPosts();
  }

  public getPublicationPosts(): void {
    this.publicationService.getPublciPublicationPosts().subscribe(
      (response) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.publications = response.data;
          this.updatePaginatedData();
        } else {
          this.publications = []; // Ikiwa hakuna data, epuka makosa
        }
      },
      (error) => console.error('Error fetching publications:', error)
    );
  }

  public getPostsByType(typeId: number): void {
    this.publicationService.getPostByType(typeId).subscribe(
      (response) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.publications = response.data;
        } else {
          this.publications = [];
        }
      },
      (error) => console.error('Error fetching posts by type:', error)
    );
  }

  public selectPublication(publication: any): void {
    this.selectedPublication = publication;
  }

  // This for paginations
  updatePaginatedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPublications = this.publications.slice(start, end);
  }

  // This for paginations
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  
}
