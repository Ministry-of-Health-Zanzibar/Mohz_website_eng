import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MinistrySystemService } from '../../../../services/ministry-system/ministry-system.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ministry-system-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './ministry-system-form.component.html',
  styleUrls: ['./ministry-system-form.component.css']
})
export class MinistrySystemFormComponent implements OnInit {
  ministryForm!: FormGroup;

  constructor(
    private ministrySystemService: MinistrySystemService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.ministryForm = this.fb.group({
      system_title: ['', [Validators.required, Validators.maxLength(255)]],
      system_link: ['', [Validators.required]],  // URL validation
      system_logo: [null]   
    });
  }

  onSubmit() {
    if (this.ministryForm.invalid) {
      this.router.navigate(['/dashboard/ministry-system-list'])
      return;
      
    }

    const formData = new FormData();
    formData.append('system_title', this.ministryForm.value.system_title);
    formData.append('system_link', this.ministryForm.value.system_link);

    // Only append the file if it's present
    if (this.ministryForm.get('system_logo')?.value) {
      formData.append('system_logo', this.ministryForm.get('system_logo')?.value);
    }

    this.ministrySystemService.createMinistrySystem(formData).subscribe(
      response => {
        console.log('Ministry System Created Successfully', response);
        this.toastService.toastSuccess(response.message);
        
      },
      error => {
        console.error('Error creating Ministry System', error);
       
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.ministryForm.patchValue({ system_logo: file });
    }
  }
}
