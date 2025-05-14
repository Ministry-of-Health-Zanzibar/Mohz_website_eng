import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MinistrySystemFormComponent } from '../ministry-system-form/ministry-system-form.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AboutUsService } from '../../../../about-us/about-us.service';
import { PermissionService } from '../../../../services/auth/permission.service';
import { AboutUsFormComponent } from '../../about-us/about-us-form/about-us-form.component';
import { DisplayAboutUsImageComponent } from '../../about-us/display-about-us-image/display-about-us-image.component';

@Component({
  selector: 'app-ministry-system-list',
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
  templateUrl: './ministry-system-list.component.html',
  styleUrls: ['./ministry-system-list.component.css'],
})
export class MinistrySystemListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ministryService: MinistrySystemService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    public permission: PermissionService,
    private router: Router
  ) {}

  public displayedColumns: string[] = ['id', 'title', 'link', 'logo', 'action'];

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
    this.getAllMinistrySystems();
  }

  onRefresh() {
    this.getAllMinistrySystems();
  }

  public getAllMinistrySystems(): void {
    this.refreshing = true;
    this.ministryService
      .getAllMinistrySystem()
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

    const dialogRef = this.dialog.open(MinistrySystemFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddMinistryEventEmitter.subscribe(
      () => {
        this.getAllMinistrySystems();
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

    const dialogRef = this.dialog.open(MinistrySystemFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditMinistryEventEmitter.subscribe(() => {
        this.getAllMinistrySystems();
      });
  }

  // Delete
  public deleteAboutUs(data: any): void {
    // console.log(data);
    this.ministryService.deleteMinistrySystem(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllMinistrySystems();
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
    this.ministryService.restore(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllMinistrySystems();
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
    this.router.navigate(['/dashboard/ministry-system-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
