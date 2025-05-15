import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { RolePermissionDisplayComponent } from '../role-permission-display/role-permission-display.component';
import { RolePermissionEditComponent } from '../role-permission-edit/role-permission-edit.component';
import { RolePermissionFormComponent } from '../role-permission-form/role-permission-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatMiniFabButton,
  MatIconButton,
  MatAnchor,
  MatButton,
  MatButtonModule,
} from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { PermissionService } from '../../../../services/auth/permission.service';
import { RolePermissionService } from '../../../../services/Roles/role-permission.service';

@Component({
  selector: 'app-role-permission-board',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './role-permission-board.component.html',
  styleUrl: './role-permission-board.component.scss',
})
export class RolePermissionBoardComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'name', 'created_at', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public isLoading: boolean = false;
  public refreshing!: boolean;

  constructor(
    public permission: PermissionService,
    private rolePermission: RolePermissionService,
    private roleService: RolePermissionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.rolesDataTable();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
  renew() {
    this.rolesDataTable();
  }

  rolesDataTable() {
    this.refreshing = true;

    this.rolePermission
      .getAllRoles()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response.data) {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.refreshing = false;
          } else {
            this.refreshing = false;

            console.log('role-permission response errors');
          }
        },
        (error) => {
          this.refreshing = false;

          console.log('role-permision getAway api fail to load');
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleAddAction() {
    let config = new MatDialogConfig();
    config.disableClose = false;
    config.role = 'dialog';
    config.maxWidth = '100vw';
    config.maxHeight = '100vh';
    config.height = '600px';
    config.width = '850px';
    config.panelClass = 'full-screen-modal';

    const dialogRef = this.dialog.open(RolePermissionFormComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      this.rolesDataTable();
    });
  }

  deleteRoles(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(id.id).subscribe((response) => {
          if (response.statusCode == 200) {
            Swal.fire('Deleted!', response.message, 'success').then(() => {
              this.rolesDataTable();
            });
          } else {
            Swal.fire('Error!', response.message, 'error');
          }
        });
      } else {
        Swal.fire('Cancelled !!!', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  displayRoles(key: any) {
    let config = new MatDialogConfig();
    config.data = {
      data: key,
    };
    config.role = 'dialog';
    config.maxWidth = '100vw';
    config.maxHeight = '100vh';
    config.height = '600px';
    config.width = '850px';
    config.panelClass = 'full-screen-modal';

    const dialogRef = this.dialog.open(RolePermissionDisplayComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.close();
    });
  }

  editRolesPermission(key: any) {
    let config = new MatDialogConfig();
    config.data = {
      data: key,
    };
    config.role = 'dialog';
    config.maxWidth = '100vw';
    config.maxHeight = '100vh';
    config.height = '600px';
    config.width = '850px';
    config.panelClass = 'full-screen-modal';

    const dialogRef = this.dialog.open(RolePermissionEditComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditRolesPermission.subscribe(
      (response) => {
        this.rolesDataTable();
      }
    );
  }
}
