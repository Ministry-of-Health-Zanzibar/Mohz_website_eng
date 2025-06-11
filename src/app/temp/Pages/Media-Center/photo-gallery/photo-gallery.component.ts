import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryService } from '../../../../services/gallery.service';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.css'
})
export class PhotoGalleryComponent implements OnInit {
  public imageUrl = environment.imageUrl + 'gallery/';
  gallery: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20; 

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getPublicPhotoGallery();
  }

getPublicPhotoGallery() {
  this.galleryService.getAllGalleries().subscribe(data => {
    console.log('Gallery data:', data); 
    this.gallery = Array.isArray(data.data) ? data.data : [];
  });
}



  get paginatedGallery(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.gallery.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.gallery.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }
}
