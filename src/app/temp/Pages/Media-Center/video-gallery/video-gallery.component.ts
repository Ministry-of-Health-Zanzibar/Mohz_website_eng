import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GalleryService } from '../../../../services/gallery.service';

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {
  gallery: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  baseVideoUrl: string = 'http://localhost:8000/storage/videos/'; // ← customize path as needed

  constructor(
    private galleryService: GalleryService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getVideoGallery();
  }

  getVideoGallery(): void {
    this.galleryService.getAllPublicGalleries()
      .subscribe((response: any) => {
        const items = Array.isArray(response?.data) ? response.data : [];
        const validTypes = ['video', 'press release', 'conference release'];

        this.gallery = items.filter((item: any) => {
          const t = (item.type_name || '').trim().toLowerCase();
          return validTypes.includes(t) && item.link; // Ensure link exists
        });
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

  getSafeVideoUrl(fileName: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.baseVideoUrl + fileName);
  }
}
