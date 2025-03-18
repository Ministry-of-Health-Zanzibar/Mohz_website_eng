import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { TeamService } from '../../../../services/teams/team.service';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatGridListModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css',
})
export class TeamFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddTeamEventEmitter = new EventEmitter();
  public onEditTeamEventEmitter = new EventEmitter();
  public teamForm: FormGroup;
  public dialogAction: string = 'CREATE NEW';
  public action: string = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private dialogRef: MatDialogRef<TeamFormComponent>,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.teamForm = this.formBuilder.group({
      id: [''],  // Add this field
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      professional: ['', Validators.required],
      profileImage: [''],
    });
    
  }

  ngOnInit(): void {
    this.getTeamData();
  }

  private getTeamData(): void {
    if (this.dialogData?.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.teamForm.patchValue({
        id: this.dialogData.data.id,  
        firstName: this.dialogData.data.first_name,
        middleName: this.dialogData.data.middle_name,
        lastName: this.dialogData.data.last_name,
        professional: this.dialogData.data.professional,
        profileImage: this.dialogData.data.team_photo,
      });
    }
  }
  

  public handleTeamSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateTeam();
    } else {
      this.onAddTeam();
    }
  }

  public onAddTeam(): void {
    if (this.teamForm.valid) {
      const formData = this.createFormData();
      this.teamService.registerTeamMember(formData).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddTeamEventEmitter.emit();
          response.statusCode === 201
            ? this.toastService.toastSuccess(response.message)
            : this.toastService.toastError(response.message);
        },
        (error: HttpErrorResponse) => {
          this.toastService.toastError(error.error.message);
        }
      );
    }
  }


 public onUpdateTeam(): void {
  if (this.teamForm.valid) {
    const id = this.teamForm.get('id')?.value;
    if (!id) {
      this.toastService.toastError('Invalid team ID');
      return;
    }
    const formData = this.createFormData();
    this.teamService.updateTeamMember(id, formData).subscribe(
      (response: any) => {
        console.log("Update Response:", response); 
        this.dialogRef.close();
        this.onEditTeamEventEmitter.emit();
        response.statusCode === 200
          ? this.toastService.toastSuccess(response.message)
          : this.toastService.toastError(response.message);
      },
      (error: HttpErrorResponse) => {
        console.error("Update Error:", error); 
        this.toastService.toastError(error.error.message);
      }
    );
  }
}

  
  private createFormData(): FormData {
    const formData = new FormData();
    
    const firstName = this.teamForm.get('firstName')?.value?.trim();
    const middleName = this.teamForm.get('middleName')?.value?.trim();
    const lastName = this.teamForm.get('lastName')?.value?.trim();
    const professional = this.teamForm.get('professional')?.value?.trim();
    const file = this.teamForm.get('profileImage')?.value;
  
    // Debugging: Log values before sending
    console.log("Form Values:", { firstName, middleName, lastName, professional });
  
    if (!firstName || !middleName || !lastName || !professional) {
      this.toastService.toastError('All fields are required');
      return formData;
    }
  
    formData.append('first_name', firstName);
    formData.append('middle_name', middleName);
    formData.append('last_name', lastName);
    formData.append('professional', professional);
  
    if (file instanceof File) {
      formData.append('team_photo', file);
    }
  
    return formData;
  }
  


  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.fileError = 'Please select a valid image file.';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'Image size should not exceed 5MB.';
        return;
      }
      this.fileError = null;
      this.teamForm.get('profileImage')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

}
