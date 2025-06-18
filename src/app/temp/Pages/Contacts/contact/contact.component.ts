import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactService } from '../../../../services/contact.service';
import { Subject } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
feedBackForm!:FormGroup;
constructor(
  private fb:FormBuilder,
  private contactService:ContactService,
  private toastService: ToastService
){}
  ngOnInit(): void {
    this.feedBackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      phone: ['', Validators.required],
      organization: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.feedBackForm.valid) {
      this.contactService.registerTeamMember(this.feedBackForm.value).subscribe({
        next: (data) => {
          // console.log('Response:', data);
          this.toastService.toastSuccess('successfully submited.');
          this.feedBackForm.reset();
        },
        
      });
    } 
  }


email = 'info@mohz.go.tz'

}
