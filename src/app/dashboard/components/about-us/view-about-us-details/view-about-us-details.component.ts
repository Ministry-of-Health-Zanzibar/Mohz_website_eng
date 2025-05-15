import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AboutUsService } from '../../../../about-us/about-us.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-view-about-us-details',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './view-about-us-details.component.html',
  styleUrl: './view-about-us-details.component.css',
})
export class ViewAboutUsDetailsComponent implements OnInit {
  public aboutUs: any;
  public aboutUsData: { title: string; value: string; isImage?: boolean }[] =
    [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private aboutUsService: AboutUsService,
    private activateRoute: ActivatedRoute,
    public permission: PermissionService,

    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAboutUsData();
  }

  public getAboutUsData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.aboutUsService.findAboutUsById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.aboutUs = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occurred while processing');
      }
    });
  }

  private populateTableData(): void {
    this.aboutUsData = [
      { title: 'Mission', value: this.aboutUs?.mission || '' },
      { title: 'Vision', value: this.aboutUs?.vision || '' },
      { title: 'E-Mail', value: this.aboutUs?.contact_email || '' },
      { title: 'Phone Number', value: this.aboutUs?.contact_phone || '' },
      { title: 'Description', value: this.aboutUs?.descriptions || '' },
      {
        title: 'AboutUs Image',
        value: this.aboutUs?.images || '',
        isImage: true,
      },
    ];
  }
}
