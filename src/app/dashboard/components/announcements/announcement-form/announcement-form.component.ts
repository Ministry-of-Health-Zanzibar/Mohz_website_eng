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
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PermissionService } from '../../../../services/auth/permission.service';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './announcement-form.component.html',
  styleUrl: './announcement-form.component.css',
})
export class AnnouncementFormComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  public onAddAnnouncementEventEmitter = new EventEmitter();
  public onEditAnnouncementEventEmitter = new EventEmitter();
  public announcementForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    public permission: PermissionService,
    private toastService: ToastService
  ) {
    this.announcementForm = this.formBuilder.group({
      announcementTitle: ['', Validators.required],
      announcementContent: ['', Validators.required],
      endDate: ['', Validators.required],
      document: [''],
    });
  }

  ngOnInit(): void {
    this.getAppointmentData();
  }

  private getAppointmentData(): void {
    this.announcementForm.patchValue({
      announcementTitle: this.dialogData.data.announcement_title,
      announcementContent: this.dialogData.data.announcement_content,
      endDate: this.dialogData.data.end_date,
      document: this.dialogData.data.announcement_document,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.announcementForm.patchValue({
        announcementTitle: this.dialogData.data.announcement_title,
        announcementContent: this.dialogData.data.announcement_content,
        endDate: this.dialogData.data.end_date,
        document: this.dialogData.data.announcement_document,
      });
    }
  }

  public handleAnnouncementSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.updateAnnouncement();
    } else {
      this.addAnnouncement();
    }
  }

  public addAnnouncement(): void {
    const formData = new FormData();
    formData.append(
      'announcement_title',
      this.announcementForm.get('announcementTitle')?.value
    );
    formData.append(
      'announcement_content',
      this.announcementForm.get('announcementContent')?.value
    );
    formData.append('end_date', this.announcementForm.get('endDate')?.value);

    const files = this.announcementForm.get('document')?.value;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('announcement_document[]', files[i], files[i].name); // Append each file
      }
    }

    this.announcementService.createAnnouncement(formData).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddAnnouncementEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError(errorResponse.error.message);
      }
    );
  }

  // Update
  public updateAnnouncement(): void {
    const formData = new FormData();
    formData.append(
      'announcement_title',
      this.announcementForm.get('announcementTitle')?.value
    );
    formData.append(
      'announcement_content',
      this.announcementForm.get('announcementContent')?.value
    );
    formData.append('end_date', this.announcementForm.get('endDate')?.value);

    formData.append(
      'announcement_document[]',
      this.announcementForm.get('document')?.value
    ); // Ensure filename is included
    // }

    this.announcementService
      .updateAnnouncement(formData, this.dialogData.data.id)
      .subscribe(
        (response: any) => {
          console.log(this.announcementForm.value);
          // console.log(response.statusCode);
          this.dialogRef.close();
          this.onEditAnnouncementEventEmitter.emit();
          if (response.statusCode == 201) {
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.message);
            // this.toastService.toastError('An error occured while processing.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse) {
            this.toastService.toastError(errorResponse.error.message);
          }
        }
      );
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      // Clear any previous errors
      this.fileError = null;

      const files = input.files;
      // Ensure all files are valid
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Validate file type
        if (file.type !== 'application/pdf') {
          this.fileError = 'Please select only PDF files.';
          return;
        }

        // Validate file size (Max 5MB per file)
        if (file.size > 5 * 1024 * 1024) {
          this.fileError = 'Document size should not exceed 5MB per file.';
          return;
        }
      }

      // Set the files in the form control
      this.announcementForm.get('document')?.setValue(files);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
