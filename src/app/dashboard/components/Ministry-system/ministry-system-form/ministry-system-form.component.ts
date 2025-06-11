import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { PermissionService } from '../../../../services/auth/permission.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ministry-system-form',
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
  templateUrl: './ministry-system-form.component.html',
  styleUrls: ['./ministry-system-form.component.css'],
})
export class MinistrySystemFormComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();

  ministryForm: any = FormGroup;
  onAddMinistryEventEmitter = new EventEmitter();
  onEditMinistryEventEmitter = new EventEmitter();

  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private ministrySystemService: MinistrySystemService,
    private dialogRef: MatDialogRef<MinistrySystemFormComponent>,
    private toastService: ToastService,
    public permission: PermissionService,
    private router: Router
  ) {
    this.ministryForm = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit(): void {
    this.getMinistryData();
  }

  private getMinistryData(): void {
    this.ministryForm.patchValue({
      title: this.dialogData.data.system_title,
      description: this.dialogData.data.system_link,
      image: this.dialogData.data.system_logo,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.ministryForm.patchValue({
        title: this.dialogData.data.system_title,
        description: this.dialogData.data.system_link,
        image: this.dialogData.data.system_logo,
      });
    }
  }

  public handleMinistrySystemSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateMinistrySystem();
    } else {
      this.onAddMinistrySystem();
    }
  }

  // Add
  public onAddMinistrySystem(): void {
    if (this.ministryForm.valid) {
      const formData = new FormData();
      formData.append('system_title', this.ministryForm.get('title')?.value);
      formData.append('system_link', this.ministryForm.get('link')?.value);
      formData.append('system_logo', this.ministryForm.get('logo')?.value);

      this.ministrySystemService.createMinistrySystem(formData).subscribe(
        (response: any) => {
          // console.log(response);
          this.dialogRef.close();
          this.onAddMinistryEventEmitter.emit();
          if (response.statusCode === 201) {
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.message);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse) {
            this.toastService.toastError(errorResponse.error.message);
          }
        }
      );
    }
  }

  // Update
  public onUpdateMinistrySystem(): void {
    if (this.ministryForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append('system_title', this.ministryForm.get('title')?.value);
      formData.append('system_link', this.ministryForm.get('link')?.value);
      formData.append('system_logo', this.ministryForm.get('logo')?.value);

      this.ministrySystemService
        .updateMinistrySystem(formData, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditMinistryEventEmitter.emit();
            if (response.statusCode === 200) {
              this.toastService.toastSuccess(response.message);
            } else {
              this.toastService.toastError(response.message);
            }
          },
          (errorResponse: HttpErrorResponse) => {
            if (errorResponse) {
              this.toastService.toastError(errorResponse.error.message);
            }
          }
        );
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.fileError = 'Please select a valid image file.';
        return;
      }

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB size limit
        this.fileError = 'Image size should not exceed 5MB.';
        return;
      }

      // Clear error and set file in form
      this.fileError = null;
      this.ministryForm.get('logo')?.setValue(file);

      // Create a preview
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

  onClose() {
    this.dialogRef.close(false);
  }
}
