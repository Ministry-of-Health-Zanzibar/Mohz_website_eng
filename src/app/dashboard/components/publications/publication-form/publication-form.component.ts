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
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { PublicationService } from '../../../../services/posts/publication.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PublicationTypeService } from '../../../../services/posts/publication-type.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-publication-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './publication-form.component.html',
  styleUrl: './publication-form.component.css',
})
export class PublicationFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddPublicationEventEmitter = new EventEmitter();
  public onEditPublicationEventEmitter = new EventEmitter();
  public publicationForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;
  publicationTypes: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private publicationTypeService: PublicationTypeService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService
  ) {
    this.publicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      apk_link: [''],
      type_id: ['', Validators.required],
      document_path: [''],
    });
  }

  ngOnInit(): void {
    this.getAllPublicationTypes();
    this.getPublicationData();
  }

  private getPublicationData(): void {
    this.publicationForm.patchValue({
      title: this.dialogData.data.title,
      apk_link: this.dialogData.data.apk_link,
      type_id: this.dialogData.data.type_id,
      document_path: this.dialogData.data.document_path,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.publicationForm.patchValue({
        title: this.dialogData.data.title,
        apk_link: this.dialogData.data.apk_link,
        type_id: this.dialogData.data.type_id,
        document_path: this.dialogData.data.document_path,
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
    if (this.publicationForm.valid) {
      const formData = new FormData();
      formData.append('title', this.publicationForm.get('title')?.value);
      formData.append('apk_link', this.publicationForm.get('apk_link')?.value);

      formData.append('type_id', this.publicationForm.get('type_id')?.value);
      formData.append(
        'document_path',
        this.publicationForm.get('document_path')?.value
      );

      this.publicationService.createPublication(formData).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddPublicationEventEmitter.emit();
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
    if (this.publicationForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append('title', this.publicationForm.get('title')?.value);
      formData.append('apk_link', this.publicationForm.get('apk_link')?.value);
      formData.append('type_id', this.publicationForm.get('type_id')?.value);
      formData.append(
        'document_path',
        this.publicationForm.get('document_path')?.value
      );

      this.publicationService
        .updatePublication(formData, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditPublicationEventEmitter.emit();
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

  public getAllPublicationTypes(): void {
    this.publicationTypeService
      .getAllPublicationTypes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            this.publicationTypes = response.data.filter(
              (type: any) => !type.deleted_at
            );
          } else {
            console.log('No data found.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.toastService.toastError(errorResponse.error.message);
        }
      );
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // ✅ Validate file type
      if (file.type !== 'application/pdf') {
        this.fileError = 'Please select a valid PDF document.';
        return;
      }

      // ✅ Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'Document size should not exceed 5MB.';
        return;
      }

      // ✅ Clear error and set file in form
      this.fileError = null;
      this.publicationForm.get('document_path')?.setValue(file);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
