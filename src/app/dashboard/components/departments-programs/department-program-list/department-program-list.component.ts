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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OurServiceService } from '../../../../services/our-service/our-service.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { OurServiceFormComponent } from '../../our-services/our-service-form/our-service-form.component';
import { DepartmentProgramService } from '../../../../services/department-programs/department-program.service';
import { DepartmentProgramFormComponent } from '../department-program-form/department-program-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-department-program-list',
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
  templateUrl: './department-program-list.component.html',
  styleUrl: './department-program-list.component.css',
})
export class DepartmentProgramListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;

  constructor(
    private dpService: DepartmentProgramService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = ['id', 'dpName', 'action'];

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
    this.getAllDepartmentPrograms();
  }

  onRefresh() {
    this.getAllDepartmentPrograms();
  }

  public getAllDepartmentPrograms(): void {
    this.refreshing = true;
    this.dpService
      .getAllDepartmentPrograms()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response);
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
    config.height = '210px';

    const dialogRef = this.dialog.open(DepartmentProgramFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddDpProgramEventEmitter.subscribe(() => {
        this.getAllDepartmentPrograms();
      });
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
    config.height = '210px';

    const dialogRef = this.dialog.open(DepartmentProgramFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditDpProgramEventEmitter.subscribe(() => {
        this.getAllDepartmentPrograms();
      });
  }

  // Delete
  public deleteDepartmentProgram(data: any): void {
    // console.log(data);
    this.dpService.deleteDepartmentProgram(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllDepartmentPrograms();
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
  public restoreDeletedDepartmentProgram(data: any): void {
    this.dpService.restoreDeletedDepartmentProgram(data, data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllDepartmentPrograms();
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

  // View Ann Details
  public navigateToDpProgramDetails(data: any): void {
    this.router.navigate(['/dashboard/dp-program-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
