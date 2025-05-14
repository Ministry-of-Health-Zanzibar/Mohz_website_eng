import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { OurServiceService } from '../../../../services/our-service/our-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-our-service-form',
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
  templateUrl: './our-service-form.component.html',
  styleUrl: './our-service-form.component.css',
})
export class OurServiceFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddOurServiceEventEmitter = new EventEmitter();
  public onEditOurServiceEventEmitter = new EventEmitter();
  public serviceForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private ourService: OurServiceService,
    private dialogRef: MatDialogRef<OurServiceFormComponent>,
    public permission: PermissionService,
    private toastService: ToastService
  ) {
    this.serviceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getOurServiceData();
  }

  private getOurServiceData(): void {
    this.serviceForm.patchValue({
      title: this.dialogData.data.service_title,
      description: this.dialogData.data.service_description,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.serviceForm.patchValue({
        title: this.dialogData.data.service_title,
        description: this.dialogData.data.service_description,
      });
    }
  }

  public handleOurServiceSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.updateOurService();
    } else {
      this.addOurService();
    }
  }

  // Add
  public addOurService(): void {
    var formData = this.serviceForm.value;
    var data = {
      service_title: formData.title,
      service_description: formData.description,
    };

    this.ourService.createOurService(data).subscribe(
      (response: any) => {
        // console.log(this.serviceForm.value);
        this.dialogRef.close();
        this.onAddOurServiceEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError('An error occured while processing');
          // this.toastService.toastError(response.message);
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
  public updateOurService(): void {
    var formData = this.serviceForm.value;
    var data = {
      service_title: formData.title,
      service_description: formData.description,
    };

    this.ourService.updateOurService(data, this.dialogData.data.id).subscribe(
      (response: any) => {
        console.log(this.serviceForm.value);
        // console.log(response.statusCode);
        this.dialogRef.close();
        this.onEditOurServiceEventEmitter.emit();
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

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
