import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { AboutUsService } from '../../../../about-us/about-us.service';

@Component({
  selector: 'app-about-us-form',
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
  templateUrl: './about-us-form.component.html',
  styleUrl: './about-us-form.component.css',
})
export class AboutUsFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddAboutUsEventEmitter = new EventEmitter();
  public onEditAboutUsEventEmitter = new EventEmitter();
  public aboutUsForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private aboutUsService: AboutUsService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.aboutUsForm = this.formBuilder.group({
      vision: ['', Validators.required],
      mission: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  ngOnInit(): void {
    this.getAboutUsData();
  }

  private getAboutUsData(): void {
    this.aboutUsForm.patchValue({
      vision: this.dialogData.data.vision,
      mission: this.dialogData.data.mission,
      email: this.dialogData.data.contact_email,
      phoneNumber: this.dialogData.data.contact_phone,
      description: this.dialogData.data.descriptions,
      image: this.dialogData.data.images,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.aboutUsForm.patchValue({
        vision: this.dialogData.data.vision,
        mission: this.dialogData.data.mission,
        email: this.dialogData.data.contact_email,
        phoneNumber: this.dialogData.data.contact_phone,
        description: this.dialogData.data.descriptions,
        image: this.dialogData.data.images,
      });
    }
  }

  public handleBannerSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateAboutUs();
    } else {
      this.onAddAboutUs();
    }
  }

  // Add
  public onAddAboutUs(): void {
    if (this.aboutUsForm.valid) {
      const formData = new FormData();
      formData.append('vision', this.aboutUsForm.get('vision')?.value);
      formData.append('mission', this.aboutUsForm.get('mission')?.value);
      formData.append('contact_email', this.aboutUsForm.get('email')?.value);
      formData.append('contact_phone', this.aboutUsForm.get('phoneNumber')?.value);
      formData.append('descriptions', this.aboutUsForm.get('description')?.value);
      formData.append('images', this.aboutUsForm.get('image')?.value);

      this.aboutUsService.createAboutUs(formData).subscribe(
        (response: any) => {
          // console.log(response);
          this.dialogRef.close();
          this.onAddAboutUsEventEmitter.emit();
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
  public onUpdateAboutUs(): void {
    if (this.aboutUsForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append('vision', this.aboutUsForm.get('vision')?.value);
      formData.append('mission', this.aboutUsForm.get('mission')?.value);
      formData.append('contact_email', this.aboutUsForm.get('email')?.value);
      formData.append('contact_phone', this.aboutUsForm.get('phoneNumber')?.value);
      formData.append('descriptions', this.aboutUsForm.get('description')?.value);
      formData.append('images', this.aboutUsForm.get('image')?.value);

      this.aboutUsService.updateAboutUs(formData, this.dialogData.data.id).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditAboutUsEventEmitter.emit();
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
      this.aboutUsForm.get('image')?.setValue(file);

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
