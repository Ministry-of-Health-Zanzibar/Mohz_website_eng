import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckbox } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import { RoleService } from '../../../../services/Roles/role.service';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
   
   
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent implements OnInit, OnDestroy{
   public onAddRolecementEventEmitter = new EventEmitter();
    public onEditRoleEventEmitter = new EventEmitter();


    private readonly onDestroy = new Subject<void>()
    public sidebarVisible:boolean = true
  
    roleForm:any = FormGroup;
    checklist: any[] = [];
    filteredChecklist: any[] = [];
  dialogRef: any;
 

  constructor(
    private formBuilder: FormBuilder, 
    private permissionService:RoleService,
    private roleService:RoleService,
    // private dialogRef: MatDialogRef<RolePermissionFormComponent>) {
    //   this.initPermission();
  ){}
  ngOnInit(): void {
    this.rolesFormData();
    this.initPermission()
  }
  ngOnDestroy(): void {
    this.onDestroy.next()
  }
  onClose() {
    this.dialogRef.close(false)
  }

  public rolesFormData(){
    this.roleForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      permissionID: this.formBuilder.array([]),  
    });
  }
  

  initPermission() {
    this.permissionService.allPermissions().pipe(takeUntil(this.onDestroy)).subscribe((response: any) => {
      this.checklist = response.data;
      this.filteredChecklist = [...this.checklist]; // Initialize filtered list with all permissions
    });
  }

    // filter permisiion
    applyFilter(event: any) {
      const searchTerm = event.target.value.toLowerCase();

      // Filter the checklist based on the search term
      this.filteredChecklist = this.checklist.filter(
        (item) => item.name.toLowerCase().includes(searchTerm)
      );
    }


    onCheckboxChange(name: string, event: any) {
      const selectedPermissions = (this.roleForm.get('permissionID') as FormArray);
      if (event.checked) {
        selectedPermissions.push(new FormControl(name));
      } else {
        const index = selectedPermissions.controls.findIndex(x => x.value === name);
        selectedPermissions.removeAt(index);
      }
    }

    checkUncheckAll(event: any) {
      const selectedPermission = (this.roleForm.get('permissionID') as FormArray);
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

  createRolePermission(){
    const data = {
      name: this.roleForm.value.name,
      permission_id: this.roleForm.value.permissionID
    }
    if(this.roleForm.value.permissionID.length > 0){
      this.roleService.addRoles(data).subscribe(response => {
        this.dialogRef.close(true);
        if(response.statusCode == 201){
          // Swal.fire({
          //   title: "Success",
          //   text: response.message,
          //   icon: "success",
          //   confirmButtonColor: "#4690eb",
          //   confirmButtonText: "Continue"
          // });
        }else{
          // Swal.fire({
          //   title: "error",
          //   text: response.message,
          //   icon: "error",
          //   confirmButtonColor: "#4690eb",
          //   confirmButtonText: "Close"
          // });
        }

      },error => {
        if(error.statusCode == 400){
          //   Swal.fire({
          //   title: "warning",
          //   text: 'Role already exist. Please choose another role name',
          //   icon: "warning",
          //   confirmButtonColor: "#4690eb",
          //   confirmButtonText: "Continue"
          // });
        }else{
          // Swal.fire({
          //   title: "Error",
          //   text: error,
          //   icon: "error",
          //   confirmButtonColor: "#4690eb",
          //   confirmButtonText: "Continue"
          // });
        }
      });
    }else{
      // Swal.fire({
      //   title: "warning",
      //   text: 'No permission selected, Please select atleast one permission for this role',
      //   icon: "warning",
      //   confirmButtonColor: "#4690eb",
      //   confirmButtonText: "Continue"
      // });
    }

  }

}
