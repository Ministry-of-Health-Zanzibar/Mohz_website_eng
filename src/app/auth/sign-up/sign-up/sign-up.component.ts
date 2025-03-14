import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule
   
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService:AuthenticationService
    
  ){}
  ngOnInit(): void {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
   
  
  onSubmit() {
    if (this.signupForm.invalid) {
      // Swal.fire('Error!', 'Please fill all required fields correctly.', 'error');
      // return;
    }

    this.authService.signup(this.signupForm.value).subscribe(
      (response) => {
        // Swal.fire('Success!', 'Account created successfully.', 'success');
        console.log(response);
        this.signupForm.reset();
      },
      (error) => {
        // Swal.fire('Error!', 'Failed to create account.', 'error');
        console.error(error);
      }
    );
  }

}
