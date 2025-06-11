import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  public documentUrl = environment.imageUrl + 'posts/documents/';

  projects: any[] = [];
  paginatedProjects: any[] = [];
  selectedProject: any = null;

  pageSize = 5;
  currentPage = 0;

  constructor(private projectService: PostService) {}

  ngOnInit(): void {
    this.getAllProjectsPost();
  }

  getAllProjectsPost(): void {
    this.projectService.getPublcProjectPosts().subscribe(
      (response) => {
        this.projects = response?.data || [];
        this.updatePaginatedData();
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  updatePaginatedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProjects = this.projects.slice(start, end);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  previewPost(filepath: string): void {
    window.open(filepath, '_blank');
  }

  selectProject(project: any): void {
    this.selectedProject = project;
  }
}
