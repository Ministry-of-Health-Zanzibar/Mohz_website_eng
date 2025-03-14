import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NewsService } from '../../../../services/news/news.service';
import { NewsFormComponent } from '../news-form/news-form.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { ChangeDetectorRef } from '@angular/core';
import { DisplayNewsImageComponent } from '../display-news-image/display-news-image.component';

interface News {
  id: string;
  news_title: string;
  news_descriptions: string;
  user_id: number;
  deleted_at: string | null;
}

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatButtonModule,
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css',
})
export class NewsListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private newsService: NewsService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'newsTitle',
    'newsDescription',
    'image',
    'action',
  ];

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
    this.getAllNews();
  }

  onRefresh() {
    this.getAllNews();
  }

  public getAllNews(): void {
    this.refreshing = true;
    this.newsService
      .getAllNews()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response);
            this.dataSource = new MatTableDataSource(response.data);
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

  // Kupunguza ukubwa wa text
  public truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
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
    config.width = '800px';
    config.height = '650px';

    const dialogRef = this.dialog.open(NewsFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddNewsEventEmitter.subscribe(
      () => {
        this.getAllNews();
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
    config.width = '800px';
    config.height = '650px';

    const dialogRef = this.dialog.open(NewsFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditNewsEventEmitter.subscribe(
      () => {
        this.getAllNews();
      }
    );
  }

  // Open Display Dialog
  public handleOpenDisplayDialogImage(data: any): void {
    const config = new MatDialogConfig();
    config.data = {
      data: data,
    };
    config.width = '600px';
    config.height = '600px';

    const dialogRef = this.dialog.open(DisplayNewsImageComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onDisplayNewsImageEventEmitter.subscribe(
        () => {
          this.getAllNews();
        }
      );
  }

  // View
  public navigateToNewsDetails(data: any): void {
    this.router.navigate(['/dashboard/news-details', data.id]);
  }


   // Delete
   public deleteNews(data: any): void {
    console.log(data);
    this.newsService.deleteNews(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllNews();
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
          // this.toastService.toastError('An error occured while processing');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse) {
          this.toastService.toastError(errorResponse.error.message);
        }
      }
    );
  }
  // Restore
    // Delete
    public restoreNews(data: any): void {
      console.log(data);
      console.log(data.id);
      this.newsService.restore(data, data.id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.getAllNews();
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.message);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse) {
            this.toastService.toastError(errorResponse.error.message);
          }
        }
      );
    }


  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
