import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
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
import { AnnouncementService } from '../../../../services/announcements/announcement.service';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { PostTypeService } from '../../../../services/types/type.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-type-form',
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
  templateUrl: './type-form.component.html',
  styleUrl: './type-form.component.css',
})
export class TypeFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddTypeEventEmitter = new EventEmitter();
  public onEditTypeEventEmitter = new EventEmitter();
  public postTypeForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private postTypeService: PostTypeService,
    private dialogRef: MatDialogRef<TypeFormComponent>,
    private toastService: ToastService,
    private router: Router
  ) {
    this.postTypeForm = this.formBuilder.group({
      typeName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPostTypeData();
  }

  private getPostTypeData(): void {
    this.postTypeForm.patchValue({
      typeName: this.dialogData.data.type_name,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.postTypeForm.patchValue({
        typeName: this.dialogData.data.type_name,
      });
    }
  }

  public handlePostTypeSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdatePostType();
    } else {
      this.onAddPostType();
    }
  }

  // Add
  public onAddPostType(): void {
    var formData = this.postTypeForm.value;
    var data = {
      type_name: formData.typeName,
    };

    this.postTypeService.createPostType(data).subscribe(
      (response: any) => {
        // console.log(this.postTypeForm.value);
        this.dialogRef.close();
        this.onAddTypeEventEmitter.emit();
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
  public onUpdatePostType(): void {
    var formData = this.postTypeForm.value;
    var data = {
      type_name: formData.typeName,
    };
    this.postTypeService
      .updatePostType(data, this.dialogData.data.id)
      .subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditTypeEventEmitter.emit();
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
