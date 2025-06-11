import { Component, EventEmitter, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NewsService } from '../../../../services/news/news.service';
import { AnnouncementFormComponent } from '../../announcements/announcement-form/announcement-form.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PermissionService } from '../../../../services/auth/permission.service';

@Component({
  selector: 'app-news-form',
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
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css',
})
export class NewsFormComponent {
  private readonly onDestroy = new Subject<void>();
  onAddNewsEventEmitter = new EventEmitter();
  onEditNewsEventEmitter = new EventEmitter();
  public newsForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;
  public previewImages!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    public permission: PermissionService,
    private dialogRef: MatDialogRef<AnnouncementFormComponent>,
    private toastService: ToastService
  ) {
    this.newsForm = this.formBuilder.group({
      newsTitle: ['', Validators.required],
      newsDescription: ['', Validators.required],
      endDate: ['', Validators.required],
      newsPhotos: [''],
    });
  }

  ngOnInit(): void {
    this.getNewsData();
  }

  private getNewsData(): void {
    this.newsForm.patchValue({
      newsTitle: this.dialogData.data.news_title,
      newsDescription: this.dialogData.data.news_descriptions,
      endDate: this.dialogData.data.end_date,
    });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.newsForm.patchValue({
        newsTitle: this.dialogData.data.news_title,
        newsDescription: this.dialogData.data.news_descriptions,
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

  public onAddNews(): void {
    const formData = new FormData();
    formData.append('news_title', this.newsForm.get('newsTitle')?.value);
    formData.append(
      'news_descriptions',
      this.newsForm.get('newsDescription')?.value
    );
    formData.append('end_date', this.newsForm.get('endDate')?.value);

    const files = this.newsForm.get('newsPhotos')?.value;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('news_photos[]', files[i]); // Append as an array
      }
    }

    this.newsService.createNews(formData).subscribe(
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

  public onUpdateNews(): void {
    const formData = new FormData();
    formData.append('id', this.dialogData.data.id);
    formData.append('news_title', this.newsForm.get('newsTitle')?.value);
    formData.append(
      'news_descriptions',
      this.newsForm.get('newsDescription')?.value
    );
    formData.append('end_date', this.newsForm.get('endDate')?.value);

    const files = this.newsForm.get('newsPhotos')?.value;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append('news_photos[]', files[i]); // Append as an array
      }
    }

    this.newsService.updateNews(formData, this.dialogData.data.id).subscribe(
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

  public onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const files = Array.from(input.files);

      this.fileError = null;
      this.newsForm.get('newsPhotos')?.setValue(files); // Store files array

      // Generate previews
      this.previewImages = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImages.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // WITH INDEX
  // public onImageSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files?.length) {
  //     const files = Array.from(input.files);

  //     this.fileError = null;
  //     this.newsForm.get('newsPhotos')?.setValue(files); // Store files array

  //     // Reset previews and selected files
  //     this.previewImages = [];
  //     this.selectedFiles = files; // Store selected files

  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.previewImages.push(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // }

  // public removeImage(index: number): void {
  //   this.previewImages.splice(index, 1);
  //   this.selectedFiles.splice(index, 1);

  //   // Update form control with the modified file list
  //   this.newsForm.get('newsPhotos')?.setValue(this.selectedFiles.length ? this.selectedFiles : null);
  // }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
