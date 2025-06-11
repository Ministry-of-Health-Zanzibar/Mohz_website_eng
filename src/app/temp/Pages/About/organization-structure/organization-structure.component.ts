import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
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
    MatButtonModule
  ],
  templateUrl: './organization-structure.component.html',
  styleUrl: './organization-structure.component.css',
})
export class OrganizationStructureComponent implements OnInit {
  level1Leader: any = null;
  level2Leaders: any[] = [];
  level3Leaders: any[] = [];

  public imageUrl = environment.imageUrl + 'organization/';

  constructor(
    private orgStructureService: OrganizationStructureService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLevel1();
  }

  loadLevel1() {
    this.orgStructureService.getPublicOrgStuctureByLevel1().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.level1Leader = response.data;
          this.loadLevel2();
          this.loadLevel3();
        }
      },
      error: (err) => {
        this.toastService.showError('Failed to load level 1 leader');
      },
    });
  }

  loadLevel2() {
    this.orgStructureService.getPublicOrganizationStructureByLevelId(2).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.level2Leaders = response.data;
        }
      },
      error: () => {
        this.toastService.showError('Failed to load level 2 leaders');
      },
    });
  }

  loadLevel3() {
    this.orgStructureService.getPublicOrganizationStructureByLevelId(3).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.level3Leaders = response.data;
        }
      },
      error: () => {
        this.toastService.showError('Failed to load level 3 leaders');
      },
    });
  }
}
