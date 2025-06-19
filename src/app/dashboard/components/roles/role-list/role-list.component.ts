import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoleService } from '../../../../services/Roles/role.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoleFormComponent } from '../role-form/role-form.component';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-role-list',
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
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;

  constructor(
    private roleService: RoleService,
        public permission: PermissionService,
    
    private toastService: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  public displayedColumns: string[] = ['id', 'name', 'guard_name'];

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
    console.log('LOADING...');
    this.getAllRoles();
  }

  onRefresh() {
    this.getAllRoles();
  }

  public getAllRoles(): void {
    this.refreshing = true;
    this.roleService
      .getAllRoles()
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
  }    public permission: PermissionService,


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
    config.height = '600px';

    const dialogRef = this.dialog.open(RoleFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddRolecementEventEmitter.subscribe(() => {
        this.getAllRoles();
      });
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
    config.height = '600px';

    const dialogRef = this.dialog.open(AnnouncementFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditAnnouncementEventEmitter.subscribe(
        () => {
          this.getAllRoles();
        }
      );
  }

  // Delete
  public deleteRoleById(data: any): void {
    console.log(data);
    this.roleService.deleteRole(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllRoles();
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

  // // Restore
  //   // Delete
  //   public restoreAnnoucement(data: any): void {
  //     console.log(data);
  //     console.log(data.id);
  //     this.roleService.restore(data, data.id).subscribe(
  //       (response: any) => {
  //         if (response.statusCode === 200) {
  //           this.getAllAnnouncements();
  //           this.toastService.toastSuccess(response.message);
  //         } else {
  //           this.toastService.toastError(response.message);
  //         }
  //       },
  //       (errorResponse: HttpErrorResponse) => {
  //         if (errorResponse) {
  //           this.toastService.toastError(errorResponse.error.message);
  //         }
  //       }
  //     );
  //   }

  // View Ann Details
  public navigateToAnnouncementDetails(data: any): void {
    this.router.navigate(['/dashboard/announcement-details', data.id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
