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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { PartnerService } from '../../../../services/partners/partner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { DisplayBennerImageComponent } from '../../banners/display-benner-image/display-benner-image.component';
import { PartnerFormComponent } from '../../partners/partner-form/partner-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationStructureService } from '../../../../services/organization-structure/organization-structure.service';
import { OrganizationStructureFormComponent } from '../organization-structure-form/organization-structure-form.component';
import { DisplayOrganizationStructureImageComponent } from '../display-organization-structure-image/display-organization-structure-image.component';

@Component({
  selector: 'app-organization-structure-list',
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
  templateUrl: './organization-structure-list.component.html',
  styleUrl: './organization-structure-list.component.css',
})
export class OrganizationStructureListComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public readonly onDestroy = new Subject<void>();
  public imageUrl = environment.imageUrl + 'organization/';
  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orgStructureService: OrganizationStructureService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'fullName',
    'position',
    'level',
    'picture',
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
    this.getAllOrganizations();
  }

  onRefresh() {
    this.getAllOrganizations();
  }

  public getAllOrganizations(): void {
    this.refreshing = true;
    this.orgStructureService
      .getAllOrganizations()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            // console.log(response);
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
    config.height = '650px';

    const dialogRef = this.dialog.open(
      OrganizationStructureFormComponent,
      config
    );
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onAddOrgStructureEventEmitter.subscribe(
        () => {
          this.getAllOrganizations();
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

    const dialogRef = this.dialog.open(
      OrganizationStructureFormComponent,
      config
    );
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onEditOrgStructureEventEmitter.subscribe(
        () => {
          this.getAllOrganizations();
        }
      );
  }

  // Open Display Dialog
  public handleOpenDisplayDialogImage(data: any): void {
    const config = new MatDialogConfig();
    config.data = {
      data: data,
    };
    config.width = '800px';
    config.height = '600px';

    const dialogRef = this.dialog.open(
      DisplayOrganizationStructureImageComponent,
      config
    );
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onDisplayOrgStructureImageEventEmitter.subscribe(
        () => {
          this.getAllOrganizations();
        }
      );
  }

  // Delete
  public deleteOrganization(data: any): void {
    console.log(data);
    this.orgStructureService.deleteOrganization(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllOrganizations();
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
