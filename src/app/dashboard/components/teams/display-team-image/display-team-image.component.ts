import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-display-team-image',
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
  templateUrl: './display-team-image.component.html',
  styleUrl: './display-team-image.component.css',
})
export class DisplayTeamImageComponent implements OnInit {
  public onDisplayTeamImageEventEmitter = new EventEmitter();
    public profileImageUrl!: string;
  
    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  
    ngOnInit(): void {
      this.getTeamMemberData();
    }
  
    private getTeamMemberData(): void {
      this.profileImageUrl = this.dialogData.data.team_photo;
    }
}
