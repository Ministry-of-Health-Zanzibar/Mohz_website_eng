import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-display-organization-structure-image',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './display-organization-structure-image.component.html',
  styleUrl: './display-organization-structure-image.component.css',
})
export class DisplayOrganizationStructureImageComponent implements OnInit {
  public onDisplayOrgStructureImageEventEmitter = new EventEmitter();
  public orgStructureImageUrl!: string;
  public imageUrl = environment.imageUrl + 'organization/';

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.getOrgStructureData();
  }

  private getOrgStructureData(): void {
    this.orgStructureImageUrl = this.dialogData.data.picture;
  }
}
