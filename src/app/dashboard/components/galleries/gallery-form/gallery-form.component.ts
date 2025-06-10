import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { GalleryService } from '../../../../services/gallery.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { GalleryTypeService } from '../../../../services/gallery-type.service';

@Component({
  selector: 'app-gallery-form',
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
  templateUrl: './gallery-form.component.html',
  styleUrl: './gallery-form.component.css',
})
export class GalleryFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddGalleryEventEmitter = new EventEmitter();
  public onEditGalleryEventEmitter = new EventEmitter();
  public galleryForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;
  galleryTypes: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private galleryService: GalleryService,
    private galleryTypeService: GalleryTypeService,
    private dialogRef: MatDialogRef<GalleryFormComponent>,
    private toastService: ToastService
  ) {
    this.galleryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeId: ['', Validators.required],
      link: ['', Validators.required],
      gallery_photo: [''],
    });
  }

  ngOnInit(): void {
    this.getAllGalleryTypes();
    this.getGalleryData();
  }

  private getGalleryData(): void {
    this.galleryForm.patchValue({
      title: this.dialogData.data.title,
      description: this.dialogData.data.description,
      link: this.dialogData.data.link,
      typeId: this.dialogData.data.type_id,
      gallery_photo: this.dialogData.data.gallery_photo,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.galleryForm.patchValue({
        title: this.dialogData.data.title,
        description: this.dialogData.data.description,
        link: this.dialogData.data.link,
        typeId: this.dialogData.data.type_id,
        gallery_photo: this.dialogData.data.gallery_photo,
      });
    }
  }

  public getAllGalleryTypes(): void {
    this.galleryTypeService
      .getAllGalleryTypes()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          if (response) {
            this.galleryTypes = response.data;
          } else {
            console.log('No data found.');
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.toastService.toastError(errorResponse.error.message);
        }
      );
  }

  public handleOrgStructureSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateGallery();
    } else {
      this.onAddGallery();
    }
  }

  // Add
  public onAddGallery(): void {
    if (this.galleryForm.valid) {
      const formData = new FormData();
      formData.append('title', this.galleryForm.get('title')?.value);
      formData.append('link', this.galleryForm.get('link')?.value);
      formData.append(
        'description',
        this.galleryForm.get('description')?.value
      );
      formData.append('type_id', this.galleryForm.get('typeId')?.value);
      formData.append(
        'gallery_photo',
        this.galleryForm.get('gallery_photo')?.value
      );
      this.galleryService.createGallery(formData).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddGalleryEventEmitter.emit();
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
  public onUpdateGallery(): void {
    if (this.galleryForm.valid) {
      const formData = new FormData();
      formData.append('title', this.galleryForm.get('title')?.value);
      formData.append('link', this.galleryForm.get('link')?.value);
      formData.append(
        'description',
        this.galleryForm.get('description')?.value
      );
      formData.append('type_id', this.galleryForm.get('typeId')?.value);
      formData.append(
        'gallery_photo',
        this.galleryForm.get('gallery_photo')?.value
      );
      this.galleryService
        .updateGallery(formData, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditGalleryEventEmitter.emit();
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
      this.galleryForm.get('gallery_photo')?.setValue(file);

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
