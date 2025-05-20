import { Component, OnInit } from '@angular/core';
import { PartnerService } from '../../../../services/partners/partner.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-view-partner-datails',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './view-partner-datails.component.html',
  styleUrl: './view-partner-datails.component.css',
})
export class ViewPartnerDatailsComponent implements OnInit {
  public partnerLogoUrl = environment.imageUrl + 'partnerLogos/';
  public partner: any;
  public partnerData: { title: string; value: string; isImage?: boolean }[] =
    [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private partnerService: PartnerService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getBannerData();
  }

  public getBannerData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.partnerService.findPartnerById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        // console.log(response.data);
        this.partner = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError(response.message);
      }
    });
  }

  private populateTableData(): void {
    this.partnerData = [
      { title: 'Partner Name	', value: this.partner?.partner_name || '' },
      {
        title: 'Partner E-mail	',
        value: this.partner?.partner_email || '',
      },
      { title: 'Phone Number	', value: this.partner?.partner_phone || '' },
      {
        title: 'Partner Website	',
        value: this.partner?.partner_website || '',
      },
      { title: 'Description	', value: this.partner?.partner_description || '' },
      { title: 'Logo', value: this.partner?.partner_logo || '', isImage: true },
    ];
  }
}
