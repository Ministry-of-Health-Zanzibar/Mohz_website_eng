import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { RoleService } from '../../../../services/Roles/role.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit, OnDestroy {

  roleForm!: FormGroup;
  checklist: any[] = [];
  filteredChecklist: any[] = [];

  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private dialogRef: MatDialogRef<RoleFormComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadPermissions();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      permissionID: this.fb.array([])
    });
  }

  private loadPermissions(): void {
    this.roleService.allPermissions().pipe(takeUntil(this.onDestroy$)).subscribe(response => {
      this.checklist = response.data || [];
      this.filteredChecklist = [...this.checklist];
    });
  }

  get permissionArray(): FormArray {
    return this.roleForm.get('permissionID') as FormArray;
  }

  onCheckboxChange(permissionId: string, event: any): void {
    if (event.checked) {
      this.permissionArray.push(new FormControl(permissionId));
    } else {
      const index = this.permissionArray.controls.findIndex(ctrl => ctrl.value === permissionId);
      if (index !== -1) {
        this.permissionArray.removeAt(index);
      }
    }
  }

  checkUncheckAll(event: any): void {
    this.permissionArray.clear();
    this.filteredChecklist.forEach(permission => {
      permission.isSelected = event.checked;
      if (event.checked) {
        this.permissionArray.push(new FormControl(permission.id));
      }
    });
  }

  applyFilter(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredChecklist = this.checklist.filter(permission =>
      permission.name.toLowerCase().includes(searchTerm)
    );
  }

  createRolePermission(): void {
    const formData = {
      name: this.roleForm.value.name,
      permission_id: this.roleForm.value.permissionID
    };

    if (formData.permission_id.length === 0) {
      Swal.fire({
        title: 'Warning',
        text: 'Please select at least one permission.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.roleService.addRoles(formData).subscribe({
      next: (response: any) => {
        if (response.statusCode === 201) {
          Swal.fire({
            title: 'Success',
            text: response.message,
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => this.dialogRef.close(true));
        } else {
          Swal.fire({
            title: 'Error',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Close'
          });
        }
      },
      error: (error) => {
        if (error.statusCode === 400) {
          Swal.fire({
            title: 'Warning',
            text: 'Role already exists. Please choose another name.',
            icon: 'warning',
            confirmButtonText: 'Continue'
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
