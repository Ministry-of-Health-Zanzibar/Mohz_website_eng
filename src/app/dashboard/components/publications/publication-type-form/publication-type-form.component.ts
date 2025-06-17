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
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { PermissionService } from '../../../../services/auth/permission.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { PostTypeService } from '../../../../services/types/type.service';
import { TypeFormComponent } from '../../types/type-form/type-form.component';
import { PublicationTypeService } from '../../../../services/posts/publication-type.service';

@Component({
  selector: 'app-publication-type-form',
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
  templateUrl: './publication-type-form.component.html',
  styleUrl: './publication-type-form.component.css',
})
export class PublicationTypeFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddPublicationTypeEventEmitter = new EventEmitter();
  public onEditPublicationTypeEventEmitter = new EventEmitter();
  public postTypeForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private typeService: PublicationTypeService,
    public permission: PermissionService,
    private dialogRef: MatDialogRef<TypeFormComponent>,
    private toastService: ToastService
  ) {
    this.postTypeForm = this.formBuilder.group({
      typeName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPublicationTypeData();
  }

  private getPublicationTypeData(): void {
    this.postTypeForm.patchValue({
      typeName: this.dialogData.data.publication_type_name,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.postTypeForm.patchValue({
        typeName: this.dialogData.data.publication_type_name,
      });
    }
  }

  public handlePublicationTypeSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdatePublicationType();
    } else {
      this.onAddPublicationType();
    }
  }

  // Add
  public onAddPublicationType(): void {
    var formData = this.postTypeForm.value;
    var data = {
      publication_type_name: formData.typeName,
    };

    this.typeService.createPublicationType(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddPublicationTypeEventEmitter.emit();
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

  // Update
  public onUpdatePublicationType(): void {
    var formData = this.postTypeForm.value;
    var data = {
      publication_type_name: formData.typeName,
    };
    this.typeService
      .updatePublicationType(data, this.dialogData.data.id)
      .subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditPublicationTypeEventEmitter.emit();
          if (response.statusCode == 201) {
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.error.message);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse) {
            this.toastService.toastError(errorResponse.error.message);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
