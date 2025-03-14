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
import { ToastService } from '../../../../services/toast/toast.service';
import { BannerFormComponent } from '../../banners/banner-form/banner-form.component';
import { DisplayBennerImageComponent } from '../../banners/display-benner-image/display-benner-image.component';
import { AboutUsService } from '../../../../about-us/about-us.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AboutUsFormComponent } from '../about-us-form/about-us-form.component';
import { DisplayAboutUsImageComponent } from '../display-about-us-image/display-about-us-image.component';

@Component({
  selector: 'app-about-us-list',
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
  templateUrl: './about-us-list.component.html',
  styleUrl: './about-us-list.component.css',
})
export class AboutUsListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private aboutUsService: AboutUsService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'vision',
    'mission',
    'email',
    'phoneNumber',
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
    this.getAllAboutUsData();
  }

  onRefresh() {
    this.getAllAboutUsData();
  }

  public getAllAboutUsData(): void {
    this.refreshing = true;
    this.aboutUsService
      .getAllAboutUsData()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response.data);
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

    const dialogRef = this.dialog.open(AboutUsFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddAboutUsEventEmitter.subscribe(
      () => {
        this.getAllAboutUsData();
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

    const dialogRef = this.dialog.open(AboutUsFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditAboutUsEventEmitter.subscribe(
      () => {
        this.getAllAboutUsData();
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

    const dialogRef = this.dialog.open(DisplayAboutUsImageComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onDisplayAboutImageEventEmitter.subscribe(
        () => {
          this.getAllAboutUsData();
        }
      );
  }

  // Delete
  public deleteAboutUs(data: any): void {
    // console.log(data);
    this.aboutUsService.deleteAboutUs(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllAboutUsData();
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
    public restoreMinistrySystem(data: any): void {
      console.log(data);
      console.log(data.id);
      this.aboutUsService.restore(data, data.id).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.getAllAboutUsData();
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
  public navigateToAboutDetails(data: any): void {
    this.router.navigate(['/dashboard/about-us-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
