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
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { GalleryTypeService } from '../../../../services/gallery-type.service';
import { GalleryTypeFormComponent } from '../gallery-type-form/gallery-type-form.component';

@Component({
  selector: 'app-gallery-type-list',
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
  templateUrl: './gallery-type-list.component.html',
  styleUrl: './gallery-type-list.component.css',
})
export class GalleryTypeListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private galleryTypeService: GalleryTypeService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = ['id', 'gallery_types_name', 'action'];

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getAllGalleryTypes();
  }

  onRefresh() {
    this.getAllGalleryTypes();
  }

  public getAllGalleryTypes(): void {
    this.refreshing = true;
    this.galleryTypeService
      .getAllGalleryTypes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            console.log(response);
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
    config.height = '220px';

    const dialogRef = this.dialog.open(GalleryTypeFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddGalleryTypeEventEmitter.subscribe(() => {
        this.getAllGalleryTypes();
      });
  }

  // Open Edit Dialog
  public handleOpenEditDialogForm(data: any): void {
    const config = new MatDialogConfig();
    config.data = {
      action: 'EDIT',
      data: data,
    };
    config.width = '800px';
    config.height = '220px';

    const dialogRef = this.dialog.open(GalleryTypeFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditGalleryTypeEventEmitter.subscribe(
        () => {
          this.getAllGalleryTypes();
        }
      );
  }

  // Delete
  public deleteGalleryType(data: any): void {
    // console.log(data);
    this.galleryTypeService.deleteGalleryType(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllGalleryTypes();
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

  // Unblock
  public unblockGalleryType(data: any): void {
    this.galleryTypeService.unblockGalleryType(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllGalleryTypes();
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
