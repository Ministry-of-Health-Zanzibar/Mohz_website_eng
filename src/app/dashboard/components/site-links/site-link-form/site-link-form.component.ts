import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NewsService } from '../../../../services/news/news.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { SiteLinkService } from '../../../../services/site-links/site-link.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-site-link-form',
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
  templateUrl: './site-link-form.component.html',
  styleUrl: './site-link-form.component.css',
})
export class SiteLinkFormComponent {
  private readonly onDestroy = new Subject<void>();
  public onAddNewsEventEmitter = new EventEmitter();
  public onEditNewsEventEmitter = new EventEmitter();
  public siteLinkForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private siteLinkService: SiteLinkService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService,
    private router: Router
  ) {
    this.siteLinkForm = this.formBuilder.group({
      sitelinkName: ['', Validators.required],
      sitelinkUrl: ['', Validators.required],
      sitelinkDescription: [''],
    });
  }

  ngOnInit(): void {
    this.getNewsData();
  }

  private getNewsData(): void {
    this.siteLinkForm.patchValue({
      sitelinkName: this.dialogData.data.sitelinks_name,
      sitelinkUrl: this.dialogData.data.sitelinks_url,
      sitelinkDescription: this.dialogData.data.sitelinks_description,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.siteLinkForm.patchValue({
        sitelinkName: this.dialogData.data.sitelinks_name,
        sitelinkUrl: this.dialogData.data.sitelinks_url,
        sitelinkDescription: this.dialogData.data.sitelinks_description,
      });
    }
  }

  public handleNewsSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdateNews();
    } else {
      this.onAddNews();
    }
  }

  // Add
  public onAddNews(): void {
    var formData = this.siteLinkForm.value;
    var data = {
      sitelinks_name: formData.sitelinkName,
      sitelinks_url: formData.sitelinkUrl,
      sitelinks_description: formData.sitelinkDescription,
    };

    this.siteLinkService.createSiteLink(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddNewsEventEmitter.emit();
        if (response.statusCode === 201) {
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

  // Update
  public onUpdateNews(): void {
    var formData = this.siteLinkForm.value;
    var data = {
      id: this.dialogData.data.id,
      sitelinks_name: formData.sitelinkName,
      sitelinks_url: formData.sitelinkUrl,
      sitelinks_description: formData.sitelinkDescription,
    };

    this.siteLinkService.updateSitelink(data, this.dialogData.id).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditNewsEventEmitter.emit();
        if (response.statusCode === 201) {
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
