import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../../../services/gallery.service';

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.css'
})
export class VideoGalleryComponent implements OnInit {
  gallery: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getVideoGallery();
  }
getVideoGallery(): void {
  this.galleryService.getAllGalleries() .subscribe((response: any) => {
    console.log('Raw response:', response);
    const items = Array.isArray(response.data) ? response.data : [];
    console.log('All items:', items);

    const validTypes = ['video', 'press release', 'conference release'];
    this.gallery = items.filter((item: any) => {
      const t = (item.type_name || '').trim().toLowerCase();
      const match = validTypes.includes(t);
      console.log(`Item "${item.title}" type_name="${t}" match=${match}`);
      return match;
    });

    console.log('Filtered gallery:', this.gallery);
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

  extractYouTubeId(url: string): string {
    const regExp = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }
}
