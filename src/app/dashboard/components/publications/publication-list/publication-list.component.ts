import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostService } from '../../../../services/posts/post.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PostFormComponent } from '../../posts/post-form/post-form.component';

@Component({
  selector: 'app-publication-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.css',
})
export class PublicationListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  postTypes: any;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = [
    'id',
    'typeName',
    'postTitle',
    'postDescription',
    'action',
  ];

  // public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // console.log('PAGINATOR: ', this.paginator);
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getPublicationPosts();
  }

  onRefresh() {
    this.getPublicationPosts();
  }


  public getPublicationPosts(): void {
    this.refreshing = true;
    this.postService
      .getPublicationPosts()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response.data);
            this.dataSource = new MatTableDataSource(response.data);
            // this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.refreshing = false;
          } else {
            this.refreshing = false;
            console.log('No data found.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.refreshing = false;
          this.toastService.toastError(errorResponse.error.message);
        }
      );
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open Add Dialog
  public handleOpenAddDialogForm(): void {
    const config = new MatDialogConfig();
    config.data = {
      action: 'CREATE NEW',
    };
    // config.width = '600px';
    config.width = '800px';
    config.height = '670px';

    const dialogRef = this.dialog.open(PostFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddPostEventEmitter.subscribe(
      () => {
        this.getPublicationPosts();
      }
    );
  }

  // Open Edit Dialog
  public handleOpenEditDialogForm(data: any): void {
    console.log(data);
    const config = new MatDialogConfig();
    config.data = {
      action: 'EDIT',
      data: data,
    };
    // config.width = '600px';
    config.width = '800px';
    config.height = '770px';

    const dialogRef = this.dialog.open(PostFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditPostEventEmitter.subscribe(
      () => {
        this.getPublicationPosts();
      }
    );
  }

  // Delete
  public deletePost(data: any): void {
    // console.log(data);
    this.postService.deletePost(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 204) {
          this.getPublicationPosts();
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError('An error occured while processing');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          this.toastService.toastError(errorResponse.error.message);
        }
      }
    );
  }

   // Kupunguza ukubwa wa text
   public truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }

   // View
   public navigateToPostDetails(data: any): void {
    this.router.navigate(['/dashboard/post-details', data.post_id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
