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
import { PostService } from '../../../../services/posts/post.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PostFormComponent } from '../../posts/post-form/post-form.component';
import { PublicationService } from '../../../../services/posts/publication.service';
import { PublicationFormComponent } from '../publication-form/publication-form.component';

@Component({
  selector: 'app-publication-list',
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
  templateUrl: './publication-list.component.html',
  styleUrl: './publication-list.component.css',
})
export class PublicationListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public isLoading: boolean = false;
  public refreshing!: boolean;
  postTypes: any;

  constructor(
    private publicationService: PublicationService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'apkLink',
    'publicationTypeName',
    'action',
  ];

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
    this.getAllPublications();
  }

  onRefresh() {
    this.getAllPublications();
  }

  public getAllPublications(): void {
    this.refreshing = true;
    this.publicationService
      .getAllPublications()
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
    // config.width = '600px';
    config.width = '950px';
    config.height = '780px';

    const dialogRef = this.dialog.open(PublicationFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddPublicationEventEmitter.subscribe(() => {
        this.getAllPublications();
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
    // config.width = '600px';
    config.width = '950px';
    config.height = '780px';

    const dialogRef = this.dialog.open(PublicationFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditPublicationEventEmitter.subscribe(
        () => {
          this.getAllPublications();
        }
      );
  }

  // Delete
  public deletePublication(id: any): void {
    this.publicationService.deletePublication(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllPublications();
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

  public unblockPublication(id: number): void {
    this.publicationService.unblockPublication(id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllPublications();
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

  // Kupunguza ukubwa wa text
  public truncateDescription(description: string, words: number): string {
    if (!description) return '';
    const wordArray = description.split(' ');
    if (wordArray.length <= words) return description;
    return wordArray.slice(0, words).join(' ') + '...';
  }

  // View
  public navigateToPublicationDetails(id: number): void {
    this.router.navigate(['/dashboard/publication-detail', id]);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
