import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-ministry-system-detail',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './ministry-system-detail.component.html',
  styleUrl: './ministry-system-detail.component.css',
})
export class MinistrySystemDetailComponent implements OnInit {
  public ministrySystem: any;
  public systemLogoUrl = environment.imageUrl + 'systemLogo/';

  public ministrySystemData: {
    title: string;
    value: string;
    isImage?: boolean;
  }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private ministryService: MinistrySystemService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getMinistrySystemData();
  }

  public getMinistrySystemData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.ministryService
      .findMinistrySystemById(id)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.ministrySystem = response.data;
          this.populateTableData();
        } else {
          this.toastService.toastError('An error occurred while processing');
        }
      });
  }

  private populateTableData(): void {
    this.ministrySystemData = [
      { title: 'System Title', value: this.ministrySystem?.system_title || '' },
      { title: 'System Link', value: this.ministrySystem?.system_link || '' },
      {
        title: 'System Logo',
        value: this.ministrySystem?.system_logo || '',
        isImage: true,
      },
    ];
  }
}
