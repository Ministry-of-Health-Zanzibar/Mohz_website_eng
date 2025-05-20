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
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamService } from '../../../../services/teams/team.service';
import { TeamFormComponent } from '../team-form/team-form.component';
import { DisplayTeamImageComponent } from '../display-team-image/display-team-image.component';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-team-list',
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
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css',
})
export class TeamListComponent implements OnInit, OnDestroy, AfterViewInit {
  public readonly onDestroy = new Subject<void>();
  public teamPhotoUrl = environment.imageUrl + 'team_photos/';

  public isLoading: boolean = false;
  public refreshing!: boolean;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  public displayedColumns: string[] = [
    'id',
    'profile',
    'fullName',
    'professional',
    'action',
  ];

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
    this.getAllTeams();
  }

  onRefresh() {
    this.getAllTeams();
  }

  public getAllTeams(): void {
    this.refreshing = true;
    this.teamService
      .getAllTeams()
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
    config.width = '600px';

    const dialogRef = this.dialog.open(TeamFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddTeamEventEmitter.subscribe(
      () => {
        this.getAllTeams();
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

    const dialogRef = this.dialog.open(TeamFormComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditTeamEventEmitter.subscribe(
      () => {
        this.getAllTeams();
      }
    );
  }

  // Open Display Dialog
  public handleOpenDisplayDialogImage(data: any): void {
    const config = new MatDialogConfig();
    config.data = {
      data: data,
    };
    config.width = '600px';

    const dialogRef = this.dialog.open(DisplayTeamImageComponent, config);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const sub =
      dialogRef.componentInstance.onDisplayTeamImageEventEmitter.subscribe(
        () => {
          this.getAllTeams();
        }
      );
  }

  // Delete
  public deleteTeam(data: any): void {
    this.teamService.deleteTeam(data.id).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.getAllTeams();
          this.toastService.toastSuccess(response.message);
        } else {
          // this.toastService.toastError('An error occured while processing');
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
