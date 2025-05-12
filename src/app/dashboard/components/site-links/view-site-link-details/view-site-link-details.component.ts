import { Component, OnInit } from '@angular/core';
import { SiteLinkService } from '../../../../services/site-links/site-link.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastService } from '../../../../services/toast/toast.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-site-link-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './view-site-link-details.component.html',
  styleUrl: './view-site-link-details.component.css',
})
export class ViewSiteLinkDetailsComponent implements OnInit {
  public sitelink: any;

  public sitelinkData: { title: string; value: string }[] = [];
  public displayedColumns: string[] = ['title', 'value'];

  constructor(
    private sitelinkService: SiteLinkService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getOurSitelinkData();
  }

  public getOurSitelinkData(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.sitelinkService.findSitelinkById(id).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.sitelink = response.data;
        this.populateTableData();
      } else {
        this.toastService.toastError('An error occurred while processing');
      }
    });
  }

  private populateTableData(): void {
    this.sitelinkData = [
      { title: 'SiteLink Name', value: this.sitelink?.sitelinks_name || '' },
      {
        title: 'SiteLink Urls',
        value: this.sitelink?.sitelinks_url || '',
      },
      {
        title: 'Description',
        value: this.sitelink?.sitelinks_description || '',
      },
    ];
  }
}
