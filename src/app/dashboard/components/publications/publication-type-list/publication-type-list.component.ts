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
import { PermissionService } from '../../../../services/auth/permission.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { TypeFormComponent } from '../../types/type-form/type-form.component';
import { PublicationTypeService } from '../../../../services/posts/publication-type.service';
import { PublicationTypeFormComponent } from '../publication-type-form/publication-type-form.component';

@Component({
  selector: 'app-publication-type-list',
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
  templateUrl: './publication-type-list.component.html',
  styleUrl: './publication-type-list.component.css',
})
export class PublicationTypeListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;

  constructor(
    private typeService: PublicationTypeService,
    private toastService: ToastService,
    public permission: PermissionService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = ['id', 'publicationType', 'action'];

  // public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    this.getAllPublicationTypes();
  }

  onRefresh() {
    this.getAllPublicationTypes();
  }

  public getAllPublicationTypes(): void {
    this.refreshing = true;
    this.typeService
      .getAllPublicationTypes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
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
    config.width = '600px';

    const dialogRef = this.dialog.open(PublicationTypeFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddPublicationTypeEventEmitter.subscribe(
        () => {
          this.getAllPublicationTypes();
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
    config.width = '600px';

    const dialogRef = this.dialog.open(PublicationTypeFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditPublicationTypeEventEmitter.subscribe(
        () => {
          this.getAllPublicationTypes();
        }
      );
  }

  // Delete
  public deletePublicationType(id: number): void {
    this.typeService.deletePublicationType(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllPublicationTypes();
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

  // Restore
  public unblockPublicationType(id: number): void {
    this.typeService.unblockPublicationType(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllPublicationTypes();
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
