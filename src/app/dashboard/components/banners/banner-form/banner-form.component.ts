import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
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
import { Subject } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BannerService } from '../../../../services/banners/banner.service';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-banner-form',
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
  templateUrl: './banner-form.component.html',
  styleUrl: './banner-form.component.css',
})
export class BannerFormComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  onAddBannerEventEmitter = new EventEmitter();
  onEditNewsEventEmitter = new EventEmitter();
  public bannerForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
    public permission: PermissionService
  ) {
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      // image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getBannerData();
  }

  private getBannerData(): void {
    this.bannerForm.patchValue({
      title: this.dialogData.data.banner_title,
      description: this.dialogData.data.banner_descriptions,
      image: this.dialogData.data.banner_image,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.bannerForm.patchValue({
        title: this.dialogData.data.banner_title,
        description: this.dialogData.data.banner_descriptions,
        image: this.dialogData.data.banner_image,
      });
    }
  }

  public handleBannerSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateBanner();
    } else {
      this.onAddBanner();
    }
  }

  // Add
  public onAddBanner(): void {
    if (this.bannerForm.valid) {
      const formData = new FormData();
      formData.append('banner_title', this.bannerForm.get('title')?.value);
      formData.append(
        'banner_descriptions',
        this.bannerForm.get('description')?.value
      );
      formData.append('banner_image', this.bannerForm.get('image')?.value);

      this.bannerService.createBanner(formData).subscribe(
        (response: any) => {
          // console.log(response);
          this.dialogRef.close();
          this.onAddBannerEventEmitter.emit();
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
  public onUpdateBanner(): void {
    if (this.bannerForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append('banner_title', this.bannerForm.get('title')?.value);
      formData.append(
        'banner_descriptions',
        this.bannerForm.get('description')?.value
      );
      formData.append('banner_image', this.bannerForm.get('image')?.value);

      this.bannerService
        .updateBanner(formData, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditNewsEventEmitter.emit();
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
      this.bannerForm.get('image')?.setValue(file);

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
