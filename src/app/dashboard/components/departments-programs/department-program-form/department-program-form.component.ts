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
import { OurServiceService } from '../../../../services/our-service/our-service.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { OurServiceFormComponent } from '../../our-services/our-service-form/our-service-form.component';
import { DepartmentProgramService } from '../../../../services/department-programs/department-program.service';

@Component({
  selector: 'app-department-program-form',
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
  templateUrl: './department-program-form.component.html',
  styleUrl: './department-program-form.component.css',
})
export class DepartmentProgramFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public onAddDpProgramEventEmitter = new EventEmitter();
  public onEditDpProgramEventEmitter = new EventEmitter();
  public depProgramForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private dpService: DepartmentProgramService,
    private dialogRef: MatDialogRef<OurServiceFormComponent>,
    private toastService: ToastService
  ) {
    this.depProgramForm = this.formBuilder.group({
      dpName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDepProgramData();
  }

  private getDepProgramData(): void {
    this.depProgramForm.patchValue({
      dpName: this.dialogData.data.dp_name,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.depProgramForm.patchValue({
        dpName: this.dialogData.data.dp_name,
      });
    }
  }

  public handleOurServiceSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.updateDepProgram();
    } else {
      this.addDepProgram();
    }
  }

  // Add
  public addDepProgram(): void {
    var formData = this.depProgramForm.value;
    var data = {
      dp_name: formData.dpName,
    };

    this.dpService.createDepartmentProgram(data).subscribe(
      (response: any) => {
        // console.log(this.serviceForm.value);
        this.dialogRef.close();
        this.onAddDpProgramEventEmitter.emit();
        if (response.statusCode === 201) {
          this.toastService.toastSuccess(response.message);
        } else {
          this.toastService.toastError(response.message);
        }
      },
      (errorResponse: any) => {
        
        if (errorResponse) {
          this.toastService.toastError(errorResponse.error.message);
        }
      }
    );
  }

  // Update
  public updateDepProgram(): void {
    var formData = this.depProgramForm.value;
    var data = {
      dp_name: formData.dpName,
    };

    this.dpService.updateDepartmentProgram(data, this.dialogData.data.id).subscribe(
      (response: any) => {
        console.log(this.depProgramForm.value);
        // console.log(response.statusCode);
        this.dialogRef.close();
        this.onEditDpProgramEventEmitter.emit();
        if (response.statusCode == 201) {
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

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
