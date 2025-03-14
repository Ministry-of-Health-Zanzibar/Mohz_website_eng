import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '../../../../services/auth/authentication.service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  onAddUserEventEmitter = new EventEmitter();
  onEditUserEventEmitter = new EventEmitter();
  signupForm!: FormGroup;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private dialogRef: MatDialogRef<UserFormComponent>  
  ) {}

  ngOnInit(): void {
     this.userData = this.data?.data;  
    this.signupForm = this.fb.group({
      first_name: [this.userData?.first_name || '', [Validators.required, Validators.minLength(2)]],
      middle_name: [this.userData?.middle_name || ''],
      last_name: [this.userData?.last_name || '', [Validators.required]],
      address: [this.userData?.address || '', [Validators.required]],
      email: [this.userData?.email || '', [Validators.required, Validators.email]],
      phone_no: [this.userData?.phone_no || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: [this.userData?.gender || '', [Validators.required]],
      date_of_birth: [this.userData?.date_of_birth || '', [Validators.required]],
      role: [this.userData?.role || '', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const formData = this.signupForm.value;

    if (this.userData) {
      // If user data exists, update user
      this.authService.updateUser(formData, this.userData.id).subscribe(
        (response) => {
          console.log('User updated successfully', response);
          this.onEditUserEventEmitter.emit();  
          this.dialogRef.close();  
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    } else {
      // Otherwise, sign up (add new user)
      this.authService.signup(formData).subscribe(
        (response) => {
          console.log('User added successfully', response);
          this.signupForm.reset();
          this.onAddUserEventEmitter.emit();  
          this.dialogRef.close();  
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
  }
}
