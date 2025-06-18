import {
  Component,
  OnInit
} from '@angular/core';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-ministry-system',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ministry-system.component.html',
  styleUrls: ['./ministry-system.component.css']
})
export class MinistrySystemComponent implements OnInit {

  ministrySystems: any[] = [];
  imageBaseUrl = environment.imageUrl;

  constructor(private ministrySystemService: MinistrySystemService) {}

  ngOnInit(): void {
    this.getAllMinistrySystem();
  }

  getAllMinistrySystem(): void {
    this.ministrySystemService.getPublicAllMinistrySystem().subscribe(
      (response) => {
        if (response?.data) {
          this.ministrySystems = response.data.filter(
            (system: any) => !system.deleted_at
          );
        }
      },
      
    );
  }
}
