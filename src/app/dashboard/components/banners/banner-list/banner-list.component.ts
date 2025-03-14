import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { ToastService } from '../../../../services/toast/toast.service';
import { NewsFormComponent } from '../../news/news-form/news-form.component';
import { BannerService } from '../../../../services/banners/banner.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BannerFormComponent } from '../banner-form/banner-form.component';
import { DisplayBennerImageComponent } from '../display-benner-image/display-benner-image.component';

@Component({
  selector: 'app-banner-list',
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
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.css',
})
export class BannerListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bannerService: BannerService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'title',
    'description',
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
    this.getAllBanners();
  }

  onRefresh() {
    this.getAllBanners();
  }

  public getAllBanners(): void {
    this.refreshing = true;
    this.bannerService
      .getAllBanners()
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

    const dialogRef = this.dialog.open(BannerFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddBannerEventEmitter.subscribe(
      () => {
        this.getAllBanners();
      }
    );
  }

  // Open Edit Dialog
  public handleOpenEditDialogForm(data: any): void {
    // console.log(data);
    const config = new MatDialogConfig();
    config.data = {
      action: 'EDIT',
      data: data,
    };
    config.width = '800px';
    config.height = '650px';

    const dialogRef = this.dialog.open(BannerFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditNewsEventEmitter.subscribe(
      () => {
        this.getAllBanners();
      }
    );
  }

  // Open Display Dialog
  public handleOpenDisplayDialogImage(data: any): void {
    const config = new MatDialogConfig();
    config.data = {
      data: data,
    };
    config.width = '800px';
    config.height = '600px';

    const dialogRef = this.dialog.open(DisplayBennerImageComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onDisplayBannerImageEventEmitter.subscribe(
        () => {
          this.getAllBanners();
        }
      );
  }

   // Delete
  //  public deleteBanner(data: any): void {
  //   console.log(data);
  //   this.bannerService.deleteBanner(data,data.id).subscribe(
  //     (response: any) => {
  //       if (response.statusCode === 200) {
  //         this.getAllBanners();
  //         this.toastService.toastSuccess(response.message);
  //       } else {
  //         this.toastService.toastError(response.message);
  //         this.toastService.toastError('An error occured while processing');
  //       }
  //     },
  //     (errorResponse: HttpErrorResponse) => {
  //       if (errorResponse) {
  //         this.toastService.toastError(errorResponse.error.message);
  //       }
  //     }
  //   );
  // }

    // Delete Banner
    public deleteBarnner(data: any): void {
      // console.log(data);
      this.bannerService.deleteBanner(data, data.id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.getAllBanners();
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

      // Restore
    // Delete
    public restoreBanner(data: any): void {
      console.log(data);
      console.log(data.id);
      this.bannerService.restore(data, data.id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.getAllBanners();
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

  // View
  public navigateToBannerDetails(data: any): void {
    this.router.navigate(['/dashboard/banner-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
