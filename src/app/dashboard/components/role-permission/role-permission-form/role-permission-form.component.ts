import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RolePermissionService } from '../../../../services/Roles/role-permission.service';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-role-permission-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    // MatLabel,
    MatDialogModule,
    MatCheckboxModule,
    // MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './role-permission-form.component.html',
  styleUrl: './role-permission-form.component.scss',
})
export class RolePermissionFormComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  public sidebarVisible: boolean = true;

  roleForm: any = FormGroup;
  checklist: any[] = [];
  filteredChecklist: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: RolePermissionService,
    private roleService: RolePermissionService,
    private toastService: ToastService,

    private dialogRef: MatDialogRef<RolePermissionFormComponent>
  ) {
    this.initPermission();
  }

  ngOnInit(): void {
    this.rolesFormData();
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
  }
  onClose() {
    this.dialogRef.close(false);
  }

  public rolesFormData() {
    this.roleForm = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required,
        // Validators.pattern(GlobalConstants.nameRegexOnly),
      ]),
      permissionID: new FormArray([]),
    });
  }

  initPermission() {
    this.permissionService
      .allPermissions()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((response: any) => {
        this.checklist = response.data;
        this.filteredChecklist = [...this.checklist]; // Initialize filtered list with all permissions
      });
  }

  // filter permisiion
  applyFilter(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    // Filter the checklist based on the search term
    this.filteredChecklist = this.checklist.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  onCheckboxChange(name: string, event: any) {
    const selectedPermissions = this.roleForm.get('permissionID') as FormArray;
    if (event.checked) {
      selectedPermissions.push(new FormControl(name));
    } else {
      const index = selectedPermissions.controls.findIndex(
        (x) => x.value === name
      );
      selectedPermissions.removeAt(index);
    }
  }

  checkUncheckAll(event: any) {
    const selectedPermission = this.roleForm.get('permissionID') as FormArray;
    // Clear the existing array
    selectedPermission.clear();
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = event.checked;
      if (event.checked) {
        this.onCheckboxChange(this.checklist[i].name, event);
        // console.log(this.checklist[i]);
      }
    }
  }

  createRolePermission() {
    const data = {
      name: this.roleForm.value.name,
      permission_id: this.roleForm.value.permissionID,
    };
    if (this.roleForm.value.permissionID.length > 0) {
      this.roleService.addRoles(data).subscribe(
        (response) => {
          this.dialogRef.close(true);
          if (response.statusCode == 201) {
            this.toastService.toastSuccess(response.message);
          } else {
            this.toastService.toastError(response.message);
          }
        },
        (error) => {
          if (error.statusCode == 400) {
            this.toastService.toastError(error.message);
          } else {
            this.toastService.toastError(error);
          }
        }
      );
    } else {
      this.toastService.toastWarning(
        'No permission selected, Please select atleast one permission for this role'
      );
    }
  }
}
