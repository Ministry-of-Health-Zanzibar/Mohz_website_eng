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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NewsService } from '../../../../services/news/news.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { NewsFormComponent } from '../../news/news-form/news-form.component';
import { SiteLinkService } from '../../../../services/site-links/site-link.service';
import { SiteLinkFormComponent } from '../site-link-form/site-link-form.component';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-site-link-list',
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
  templateUrl: './site-link-list.component.html',
  styleUrl: './site-link-list.component.css',
})
export class SiteLinkListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private siteLinkService: SiteLinkService,
    public permission: PermissionService,

    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'sitelinkName',
    'sitelinkUrl',
    'sitelinkDescription',
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
    this.getAllSitelinks();
  }

  onRefresh() {
    this.getAllSitelinks();
  }

  public getAllSitelinks(): void {
    this.refreshing = true;
    this.siteLinkService
      .getAllSitelinks()
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
    // config.width = '600px';
    config.width = '800px';
    config.height = '770px';

    const dialogRef = this.dialog.open(SiteLinkFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddNewsEventEmitter.subscribe(
      () => {
        this.getAllSitelinks();
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

    const dialogRef = this.dialog.open(SiteLinkFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditNewsEventEmitter.subscribe(
      () => {
        this.getAllSitelinks();
      }
    );
  }

  // Delete
  public deleteSitelink(data: any): void {
    console.log(data);
    this.siteLinkService.deleteSitelink(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllSitelinks();
          this.toastService.toastSuccess(response.message);
        } else {
          // this.toastService.toastError('An error occured while processing');
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
  public navigateToSitelinkDetails(data: any): void {
    this.router.navigate(['/dashboard/site-link-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
