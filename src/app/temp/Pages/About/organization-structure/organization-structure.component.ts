import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrganizationStructureService } from '../../../../services/organization-structure/organization-structure.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../../../../services/toast/toast.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-organization-structure',
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
  templateUrl: './organization-structure.component.html',
  styleUrl: './organization-structure.component.css',
})
export class OrganizationStructureComponent implements OnInit {
  organizationStructures: any[] = [];
  public imageUrl = environment.imageUrl + 'organization/';
  organization: any;
  constructor(
    private orgStructureService: OrganizationStructureService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getAllOrganizations();
  }

  // public getAllOrganizations(): void {
  //   this.orgStructureService.getPublicAllOrganizations().subscribe({
  //     next: (response) => {
  //       if (response && response.data && response.data.length > 0) {
  //         this.organization = response.data[0]; 
  //         console.log('Loaded organization:', this.organization);
  //       } else {
  //         console.warn('No organization data found.');
  //       }
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch organization structures', err);
  //       this.toastService.toastError('Failed to load organization structures.');
  //     },
  //   });
  // }
}
