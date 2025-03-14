import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
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
       RouterModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
    public isLoading: boolean = false;
    public refreshing!: boolean;
   

  constructor(
     
        private toastService: ToastService,
        private dialog: MatDialog,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private authService:AuthenticationService
  ) {}

  public displayedColumns: string[] = [
    'id',
    'first_name',
    'middle_name',
    'last_name',
    'address',
    'phone_no',
    'date_of_birth',
    'role',
    'action',
  ];


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
      this.getAllUsers();
      
    }
  
    onRefresh() {
      this.getAllUsers();
    }
  
    public getAllUsers(): void {
      this.refreshing = true;
      this.authService
        .getAllUser()
        .pipe(takeUntil(this.onDestroy))
        .subscribe(
          (response: any) => {
            if (response) {
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
      config.height = '670px';
  
      const dialogRef = this.dialog.open(UserFormComponent, config);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
  
      const sub = dialogRef.componentInstance.onAddUserEventEmitter.subscribe(
        () => {
          this.getAllUsers();
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
      config.height = '775px';
  
      const dialogRef = this.dialog.open(UserFormComponent, config);
      this.router.events.subscribe(() => {
        dialogRef.close();
      });
  
      const sub = dialogRef.componentInstance.onEditUserEventEmitter.subscribe(
        () => {
          this.getAllUsers();
        }
      );
    }
  
   
    // View
    public navigateToViewUserDetails(data: any): void {
      this.router.navigate(['/dashboard/view-user-details', data.id]);
    }
  
    ngOnDestroy(): void {
      this.onDestroy.next();
    }
 
  
}
