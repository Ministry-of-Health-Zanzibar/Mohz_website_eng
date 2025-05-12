import { Component, OnInit } from '@angular/core';
import { DepartmentProgramService } from '../../../../services/department-programs/department-program.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-department-program',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './view-department-program.component.html',
  styleUrl: './view-department-program.component.css',
})
export class ViewDepartmentProgramComponent implements OnInit {
  public depProgram: any;
  public depProgramData: { title: string; value: string }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private depProgramService: DepartmentProgramService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getDepProgramData();
  }

  public getDepProgramData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.depProgramService
      .findDepartmentProgramById(id)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.depProgram = response.data;
          this.populateTableData();
        } else {
          this.toastService.toastError(response.message);
        }
      });
  }

  private populateTableData(): void {
    this.depProgramData = [
      { title: 'Title', value: this.depProgram?.dp_name || '' },
    ];
  }
}
