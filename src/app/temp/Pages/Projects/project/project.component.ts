import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent  implements OnInit{
  projects: any [] =[];
  public documentUrl = environment.imageUrl + 'posts/documents/'
  constructor(private projectService: PostService){}
  ngOnInit(): void {
    this.getAllProjectsPost();
 
  }

  getAllProjectsPost() {
    this.projectService.getPublcProjectPosts().subscribe(
      (response) => {
        console.log("API Response:", response); 
        this.projects = response.data || []; 
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
