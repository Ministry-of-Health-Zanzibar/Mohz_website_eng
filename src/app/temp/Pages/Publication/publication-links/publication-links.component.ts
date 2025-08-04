import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../../environments/environment.prod';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { PublicationTypeService } from '../../../../services/posts/publication-type.service';
import { PublicationService } from '../../../../services/posts/publication.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-publication-links',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatPaginatorModule,MatIconModule, MatProgressSpinnerModule],
  templateUrl: './publication-links.component.html',
  styleUrl: './publication-links.component.css',
})
export class PublicationLinksComponent implements OnInit {
  public documentUrl = environment.imageUrl + 'publicationDocuments/';

  publications: any[] = [];
  selectedPublication: any = null;

  paginatedPublications: any[] = [];
  pageSize = 15;
  currentPage = 0;
  publicationTypes: any;
  publication: any;
  isLoading!: boolean;

  constructor(
    private publicationService: PublicationService, 
    private publicationTypeService:PublicationTypeService,
  ) {}

  ngOnInit(): void {
    this.getAllPublicationTypes();
  }

public getPublicPublicationsByType(typeName: string): void {
  this.publicationService.getPublicPublicationsByType(typeName).subscribe(
    (response) => {
      if (response && response.data && Array.isArray(response.data)) {
        // Filter out deleted publications
        this.publications = response.data.filter(
          (publication: any) => !publication.deleted_at,
        );
      } 
    },
    
  );
}



public getAllPublicationTypes(): void {
  this.publicationTypeService.getAllPublicPublicationTypes().subscribe(
    (response) => {
      if (response && response.data && Array.isArray(response.data)) {
        // Filter out deleted publications
        this.publicationTypes = response.data.filter(
          (publication: any) => !publication.deleted_at
        );
        this.updatePaginatedData();
      } else {
        this.publications = [];
      }
    },
   
  );
}


selectedPublicationType: any = null;

onSelectedPublicationType(type: any): void {
  this.selectedPublication = null;
  this.publication = null; // Reset publication details

  this.selectedPublicationType = type;
    this.getPublicPublicationsByType(this.selectedPublicationType);
  console.log('Selected Publication Type:', this.selectedPublicationType);
}




 public getPublicPublicationById(id: number): void {
  this.isLoading = true;
  this.publicationService.getPublicPublicationsById(id).subscribe(
    (response) => {
  //     if (response && response.data) {
  //       this.publication = response.data; 
  // this.isLoading = false;

  //     } else {
  //       this.publication = null;
  // this.isLoading = false;

  //     }

   setTimeout(() => {
        if (response && response.data) {
          this.publication = response.data;
        } else {
          this.publication = null;
        }
        this.isLoading = false;
      }, 3000); // 3-second delay
    }
   
  );
}



  // This for paginations
  updatePaginatedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPublications = this.publicationTypes.slice(start, end);
  }

  // This for paginations
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  
}
