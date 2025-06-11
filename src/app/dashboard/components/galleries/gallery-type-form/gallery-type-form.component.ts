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
import { Subject } from 'rxjs';
import { OrganizationStructureService } from '../../../../services/organization-structure/organization-structure.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { OrganizationStructureFormComponent } from '../../organization-structure/organization-structure-form/organization-structure-form.component';
import { GalleryTypeService } from '../../../../services/gallery-type.service';

@Component({
  selector: 'app-gallery-type-form',
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
  templateUrl: './gallery-type-form.component.html',
  styleUrl: './gallery-type-form.component.css',
})
export class GalleryTypeFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddGalleryTypeEventEmitter = new EventEmitter();
  public onEditGalleryTypeEventEmitter = new EventEmitter();
  public galleryTypeForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private galleryTypeService: GalleryTypeService,
    private dialogRef: MatDialogRef<GalleryTypeFormComponent>,
    private toastService: ToastService
  ) {
    this.galleryTypeForm = this.formBuilder.group({
      typeName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getGalleryTypeData();
  }

  private getGalleryTypeData(): void {
    this.galleryTypeForm.patchValue({
      typeName: this.dialogData.data.gallery_types_name,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.galleryTypeForm.patchValue({
        typeName: this.dialogData.data.gallery_types_name,
      });
    }
  }

  public handlGalleryTypeSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateGalleryType();
    } else {
      this.onAddGalleryType();
    }
  }

  // Add
  public onAddGalleryType(): void {
    if (this.galleryTypeForm.valid) {
      var formData = this.galleryTypeForm.value;
      var data = {
        gallery_types_name: formData.typeName,
      };

      this.galleryTypeService.createGalleryType(data).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddGalleryTypeEventEmitter.emit();
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
  public onUpdateGalleryType(): void {
    if (this.galleryTypeForm.valid) {
      var formData = this.galleryTypeForm.value;
      var data = {
        gallery_types_name: formData.typeName,
      };

      this.galleryTypeService
        .updateGalleryType(data, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditGalleryTypeEventEmitter.emit();
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

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
