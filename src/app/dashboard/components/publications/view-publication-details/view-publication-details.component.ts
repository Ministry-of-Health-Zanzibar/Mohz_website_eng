import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { PostService } from '../../../../services/posts/post.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PublicationService } from '../../../../services/posts/publication.service';

@Component({
  selector: 'app-view-publication-details',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './view-publication-details.component.html',
  styleUrl: './view-publication-details.component.css',
})
export class ViewPublicationDetailsComponent implements OnInit {
  public publication: any;
  public publicationData: {
    title: string;
    value: string;
    isPdf?: boolean;
  }[] = [];

  public displayedColumns: string[] = ['title', 'value'];
  public documentUrl = environment.imageUrl + 'publicationDocuments/';

  constructor(
    private publicationService: PublicationService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getPublcationData();
  }

  public getPublcationData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.publicationService.findPublication(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        console.log('DATA: ', response.data);
        this.publication = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occured while processing');
      }
    });
  }

  private populateTableData(): void {
    this.publicationData = [
      { title: 'Title', value: this.publication?.title || '' },
      { title: 'Apk Link', value: this.publication?.apk_link || '' },
      { title: 'Description', value: this.publication?.description || '' },
    ];

    const filePaths: string[] = this.publication?.document_path || [];

    filePaths.forEach((filePath: string, index: number) => {
      const ext = filePath.split('.').pop()?.toLowerCase();
      const isPdf = ext === 'pdf';

      this.publicationData.push({
        title: `File ${index + 1}`,
        value: filePath,
        isPdf,
      });
    });
  }

  public isPdf(filePath: string): boolean {
    return filePath?.endsWith('.pdf');
  }
}
