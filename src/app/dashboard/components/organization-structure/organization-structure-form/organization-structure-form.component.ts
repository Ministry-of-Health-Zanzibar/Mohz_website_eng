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
import { PartnerService } from '../../../../services/partners/partner.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { OrganizationStructureService } from '../../../../services/organization-structure/organization-structure.service';

@Component({
  selector: 'app-organization-structure-form',
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
  templateUrl: './organization-structure-form.component.html',
  styleUrl: './organization-structure-form.component.css',
})
export class OrganizationStructureFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddOrgStructureEventEmitter = new EventEmitter();
  public onEditOrgStructureEventEmitter = new EventEmitter();
  public orgStructureForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private orgStructureService: OrganizationStructureService,
    private dialogRef: MatDialogRef<OrganizationStructureFormComponent>,
    private toastService: ToastService
  ) {
    this.orgStructureForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      level: ['', Validators.required],
      picture: [''],
    });
  }

  ngOnInit(): void {
    this.getOrgStructureData();
  }

  private getOrgStructureData(): void {
    this.orgStructureForm.patchValue({
      fullName: this.dialogData.data.full_name,
      position: this.dialogData.data.position,
      level: this.dialogData.data.level,
      picture: this.dialogData.data.picture,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.orgStructureForm.patchValue({
        fullName: this.dialogData.data.full_name,
        position: this.dialogData.data.position,
        level: this.dialogData.data.level,
        picture: this.dialogData.data.picture,
      });
    }
  }

  public handleOrgStructureSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateOrgStructure();
    } else {
      this.onAddOrgStructure();
    }
  }

  // Add
  public onAddOrgStructure(): void {
    if (this.orgStructureForm.valid) {
      const formData = new FormData();
      formData.append(
        'full_name',
        this.orgStructureForm.get('fullName')?.value
      );
      formData.append('level', this.orgStructureForm.get('level')?.value);
      formData.append('position', this.orgStructureForm.get('position')?.value);
      formData.append('picture', this.orgStructureForm.get('picture')?.value);

      this.orgStructureService.createOrganization(formData).subscribe(
        (response: any) => {
          // console.log(response);
          this.dialogRef.close();
          this.onAddOrgStructureEventEmitter.emit();
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
  public onUpdateOrgStructure(): void {
    if (this.orgStructureForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.id);
      formData.append(
        'full_name',
        this.orgStructureForm.get('fullName')?.value
      );
      formData.append('level', this.orgStructureForm.get('level')?.value);
      formData.append('position', this.orgStructureForm.get('position')?.value);
      formData.append('picture', this.orgStructureForm.get('picture')?.value);

      this.orgStructureService
        .updateOrganization(formData, this.dialogData.data.id)
        .subscribe(
          (response: any) => {
            this.dialogRef.close();
            this.onEditOrgStructureEventEmitter.emit();
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
      this.orgStructureForm.get('picture')?.setValue(file);

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
