import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-display-benner-image',
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
  templateUrl: './display-benner-image.component.html',
  styleUrl: './display-benner-image.component.css',
})
export class DisplayBennerImageComponent implements OnInit {
  public onDisplayBannerImageEventEmitter = new EventEmitter();
  public bannerImageUrl!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.getBannerData();
  }

  private getBannerData(): void {
    this.bannerImageUrl = this.dialogData.data.banner_image;
  }
}
