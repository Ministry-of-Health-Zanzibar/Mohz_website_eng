import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-banner-details',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './view-banner-details.component.html',
  styleUrl: './view-banner-details.component.css',
})
export class ViewBannerDetailsComponent implements OnInit {
  public banner: any;
  public bannerData: { title: string; value: string; isImage?: boolean }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private bannerService: BannerService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getBannerData();
  }

  public getBannerData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.bannerService.findBannerById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        // console.log(response.data);
        this.banner = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occured while processing');
        // this.toastService.toastError(response.message);
      }
    });
  }

  private populateTableData(): void {
    this.bannerData = [
      { title: 'Title', value: this.banner?.banner_title || '' },
      { title: 'Description', value: this.banner?.banner_descriptions || '' },
      { title: 'Image', value: this.banner?.banner_image || '', isImage: true },
    ];
  }
}
