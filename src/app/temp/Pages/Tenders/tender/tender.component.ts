import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-tender',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {
  public documentUrl = environment.imageUrl + 'posts/documents/';

  tenders: any[] = [];
  paginatedTenders: any[] = [];
  selectedTender: any = null;

  pageSize = 5;
  currentPage = 0;

  constructor(private tenderService: PostService) {}

  ngOnInit(): void {
    this.getAllTenders();
  }

  getAllTenders(): void {
    this.tenderService.getPublcTenderPosts().subscribe(
      (response) => {
        this.tenders = response?.data || [];
        this.updatePaginatedData();
      },
      (error) => {
        console.error('Error fetching tenders:', error);
      }
    );
  }

  updatePaginatedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTenders = this.tenders.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  previewPost(filepath: string): void {
    window.open(filepath, '_blank');
  }

  selectTender(tender: any): void {
    this.selectedTender = tender;
  }
}
