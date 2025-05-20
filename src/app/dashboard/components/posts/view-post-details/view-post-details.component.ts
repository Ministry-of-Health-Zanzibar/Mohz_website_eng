import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../../../../services/posts/post.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-post-details',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './view-post-details.component.html',
  styleUrl: './view-post-details.component.css',
})
export class ViewPostDetailsComponent implements OnInit {
  public post: any;
  public postData: {
    title: string;
    value: string;
    isImage?: boolean;
    isPdf?: boolean;
  }[] = [];

  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getPostData();
  }

  public getPostData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.postService.findPostById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.post = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occured while processing');
      }
    });
  }

  private populateTableData(): void {
    this.postData = [
      { title: 'Title', value: this.post?.post_title || '' },
      { title: 'Description', value: this.post?.post_description || '' },
    ];

    const filePaths: string[] = this.post?.post_filepath || [];

    filePaths.forEach((filePath: string, index: number) => {
      const ext = filePath.split('.').pop()?.toLowerCase();
      const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(ext!);
      const isPdf = ext === 'pdf';

      this.postData.push({
        title: `File ${index + 1}`,
        value: filePath,
        isImage,
        isPdf,
      });
    });
  }

  public isImage(filePath: string): boolean {
    return filePath?.match(/\.(jpeg|jpg|png|gif)$/i) !== null;
  }

  public isPdf(filePath: string): boolean {
    return filePath?.endsWith('.pdf');
  }
}
