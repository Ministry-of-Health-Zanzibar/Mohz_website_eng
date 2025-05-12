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
import { BannerService } from '../../../../services/banners/banner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { PartnerService } from '../../../../services/partners/partner.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-partner-form',
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
  templateUrl: './partner-form.component.html',
  styleUrl: './partner-form.component.css',
})
export class PartnerFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddPartnerEventEmitter = new EventEmitter();
  public onEditPartnerEventEmitter = new EventEmitter();
  public partnerForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private partnerService: PartnerService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.partnerForm = this.formBuilder.group({
      partnerName: ['', Validators.required],
      partnerEmail: ['', Validators.required],
      partnerPhone: ['', Validators.required],
      partnerWebsite: ['', Validators.required],
      partnerDescription: ['', Validators.required],
      partnerLogo: [''],
    });
  }

  ngOnInit(): void {
    this.getPartnerData();
  }

  private getPartnerData(): void {
    this.partnerForm.patchValue({
      partnerName: this.dialogData.data.partner_name,
      partnerEmail: this.dialogData.data.partner_email,
      partnerPhone: this.dialogData.data.partner_phone,
      partnerWebsite: this.dialogData.data.partner_website,
      partnerDescription: this.dialogData.data.partner_description,
      partnerLogo: this.dialogData.data.partner_logo,
      partnerStatus: this.dialogData.data.partner_status,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.partnerForm.patchValue({
        partnerName: this.dialogData.data.partner_name,
        partnerEmail: this.dialogData.data.partner_email,
        partnerPhone: this.dialogData.data.partner_phone,
        partnerWebsite: this.dialogData.data.partner_website,
        partnerDescription: this.dialogData.data.partner_description,
        partnerLogo: this.dialogData.data.partner_logo,
        partnerStatus: this.dialogData.data.partner_status,
      });
    }
  }

  public handlePartnerSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdatePartner();
    } else {
      this.onAddPartner();
    }
  }

  // Add
  public onAddPartner(): void {
    if (this.partnerForm.valid) {
      const formData = new FormData();
      formData.append(
        'partner_name',
        this.partnerForm.get('partnerName')?.value
      );
      formData.append(
        'partner_email',
        this.partnerForm.get('partnerEmail')?.value
      );
      formData.append(
        'partner_phone',
        this.partnerForm.get('partnerPhone')?.value
      );
      formData.append(
        'partner_website',
        this.partnerForm.get('partnerWebsite')?.value
      );
      formData.append(
        'partner_description',
        this.partnerForm.get('partnerDescription')?.value
      );
      formData.append(
        'partner_logo',
        this.partnerForm.get('partnerLogo')?.value
      );

      this.partnerService.createPartner(formData).subscribe(
        (response: any) => {
          // console.log(response);
          this.dialogRef.close();
          this.onAddPartnerEventEmitter.emit();
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
  public onUpdatePartner(): void {
    if (this.partnerForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append(
        'partner_name',
        this.partnerForm.get('partnerName')?.value
      );
      formData.append(
        'partner_email',
        this.partnerForm.get('partnerEmail')?.value
      );
      formData.append(
        'partner_phone',
        this.partnerForm.get('partnerPhone')?.value
      );
      formData.append(
        'partner_website',
        this.partnerForm.get('partnerWebsite')?.value
      );
      formData.append(
        'partner_description',
        this.partnerForm.get('partnerDescription')?.value
      );
      formData.append(
        'partner_logo',
        this.partnerForm.get('partnerLogo')?.value
      );

      this.partnerService.updatePartner(formData, this.dialogData.data.id).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditPartnerEventEmitter.emit();
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
      this.partnerForm.get('partnerLogo')?.setValue(file);

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
