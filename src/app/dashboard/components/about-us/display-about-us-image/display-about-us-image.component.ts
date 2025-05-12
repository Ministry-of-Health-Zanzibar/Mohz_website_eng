import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-display-about-us-image',
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
  templateUrl: './display-about-us-image.component.html',
  styleUrl: './display-about-us-image.component.css',
})
export class DisplayAboutUsImageComponent implements OnInit {
  public onDisplayAboutImageEventEmitter = new EventEmitter();
  public aboutUsImageUrl!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.getAboutUsData();
  }

  private getAboutUsData(): void {
    this.aboutUsImageUrl = this.dialogData.data.images;
  }
}
