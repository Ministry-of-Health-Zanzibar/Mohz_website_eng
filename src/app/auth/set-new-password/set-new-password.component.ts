import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { ToastService } from '../../services/toast/toast.service';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-set-new-password',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule ,
    MatCardModule
  ],
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  credentialForm!: FormGroup;
  passwordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router,
     private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      old_password: new FormControl(null, [Validators.required]),
      new_password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, [Validators.required]),
    }, {
      validators: this.checkPassword('new_password', 'password_confirmation') // Apply custom validator
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility(visibility: string): void {
    if (visibility === 'old') {
      this.passwordVisible = !this.passwordVisible;
    }
    if (visibility === 'new') {
      this.newPasswordVisible = !this.newPasswordVisible;
    }
    if (visibility === 'confirm') {
      this.passwordConfirmVisible = !this.passwordConfirmVisible;
    }
  }

  // Custom password validator to check if new password and confirmation match
  checkPassword(new_password: string, password_confirmation: string): any {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordValue = control.get(new_password)?.value;
      const confirmPasswordValue = control.get(password_confirmation)?.value;

      if (passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }

  // Submit function 
  submit(): void {
    if (this.credentialForm.invalid) {
      return; // Optionally, handle form validation errors here
    }

    this.authService.changePassword(this.credentialForm.value).subscribe(
      (response) => {
        if (response.statusCode === 201) {
          this.toastService.toastSuccess('password successful changed')
          this.router.navigateByUrl('/auth/login'); // Navigate to login or home page
        } else {
          this.toastService.toastError('error try again')
        }
      },
      (error) => {

        // Swal.fire({
        //   title: 'Warning!',
        //   text: 'Connection failed! Please try again later.',
        //   icon: 'warning',
        //   confirmButtonText: 'OK',
        // });
      }
    );
  }
}
