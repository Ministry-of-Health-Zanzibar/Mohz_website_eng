import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommentService } from '../../../../services/comments/comment.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-coment-list',
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
  templateUrl: './coment-list.component.html',
  styleUrl: './coment-list.component.css',
})
export class ComentListComponent {
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commentService: CommentService,
    private dialog: MatDialog,
    private router: Router,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = [
    'id',
    // 'newsTitle',
    'commentDetails',
    'senderName',
    'receiverName',
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
    this.getAllComments();
  }

  onRefresh() {
    this.getAllComments();
  }

  public getAllComments(): void {
    this.refreshing = true;
    this.commentService
      .getAllComments()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response.message);
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.refreshing = false;
          } else {
            console.log('No data found.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.refreshing = true;
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

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
