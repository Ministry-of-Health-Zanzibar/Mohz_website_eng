import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { OurServiceService } from '../../../../services/our-service/our-service.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-service-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './view-service-details.component.html',
  styleUrl: './view-service-details.component.css',
})
export class ViewServiceDetailsComponent implements OnInit {
  public ourService: any;
  public ourServiceData: { title: string; value: string }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private ourServiceService: OurServiceService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getOurServiceData();
  }

  public getOurServiceData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.ourServiceService.findOurServiceById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.ourService = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occurred while processing');
      }
    });
  }

  private populateTableData(): void {
    this.ourServiceData = [
      { title: 'Title', value: this.ourService?.service_title || '' },
      {
        title: 'Description',
        value: this.ourService?.service_description || '',
      },
    ];
  }
}
