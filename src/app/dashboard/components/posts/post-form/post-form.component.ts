import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
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
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastService } from '../../../../services/toast/toast.service';
import { PostService } from '../../../../services/posts/post.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PostTypeService } from '../../../../services/types/type.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    RouterModule,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  private readonly onDestroy = new Subject<void>();
  onAddPostEventEmitter = new EventEmitter();
  onEditPostEventEmitter = new EventEmitter();
  public postForm: any = FormGroup;
  public dialogAction: any = 'CREATE NEW';
  public action: any = 'Save';
  public previewImage: string | ArrayBuffer | null = null;
  public fileError: string | null = null;
  public postTypes: any;
  public postTypeId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private typeService: PostTypeService,
    private dialogRef: MatDialogRef<PostFormComponent>,
    private toastService: ToastService
  ) {
    this.postForm = this.formBuilder.group({
      postTitle: ['', Validators.required],
      postDescription: ['', Validators.required],
      postFilepath: [''],
      postTypeId: ['', Validators.required],
      typeName: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    this.getAllTypes();
    this.getPostData();
  }

  private getPostData(): void {
    this.postForm.patchValue({
      postTitle: this.dialogData.data.post_title,
      postDescription: this.dialogData.data.post_description,
      postFilepath: this.dialogData.data.post_filepath,
      postTypeId: this.dialogData.data.type_id,
      typeName: this.dialogData.data.type_name,
      endDate: this.dialogData.data.end_date,
    });

    // Listen for changes in postTypeId and update typeName dynamically
    this.postForm
      .get('postTypeId')
      ?.valueChanges.subscribe((selectedId: any) => {
        const selectedType = this.postTypes.find(
          (type: { id: any }) => type.id === selectedId
        );
        if (selectedType) {
          this.postForm.patchValue({ typeName: selectedType.type_name });
        }
      });

    if (this.dialogData.action === 'EDIT') {
      this.dialogAction = 'EDIT';
      this.action = 'Update';
      this.postForm.patchValue({
        postTitle: this.dialogData.data.post_title,
        postDescription: this.dialogData.data.post_description,
        postFilepath: this.dialogData.data.post_filepath,
        postTypeId: this.dialogData.data.type_id,
        typeName: this.dialogData.data.type_name,
      });
    }
  }

  public handlePostSubmit(): void {
    if (this.dialogAction === 'EDIT') {
      this.onUpdatePost();
    } else {
      this.onAddPost();
    }
  }

  // Fetch all types
  public getAllTypes(): void {
    this.typeService.getAllPostTypes().subscribe(
      (response: any) => {
        if (response) {
          // console.log('TYPES: ', response.data);
          this.postTypes = response.data;
        } else {
          console.log('No data found.');
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastService.toastError(errorResponse.error.message);
      }
    );
  }

  // Add
  public onAddPost(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('post_title', this.postForm.get('postTitle')?.value);
      formData.append(
        'post_description',
        this.postForm.get('postDescription')?.value
      );
      formData.append(
        'post_filepath',
        this.postForm.get('postFilepath')?.value
      );
      formData.append('type_id', this.postForm.get('postTypeId')?.value);
      formData.append('end_date', this.postForm.get('endDate')?.value);

      this.postService.createPost(formData).subscribe(
        (response: any) => {
          // console.log(response);

          this.dialogRef.close();
          this.onAddPostEventEmitter.emit();
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
  }

  // Update
  public onUpdatePost(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('id', this.dialogData.data.post_id);
      formData.append('post_title', this.postForm.get('postTitle')?.value);
      formData.append(
        'post_description',
        this.postForm.get('postDescription')?.value
      );
      formData.append(
        'post_filepath',
        this.postForm.get('postFilepath')?.value
      );
      formData.append('type_id', this.postForm.get('postTypeId')?.value);
      formData.append('end_date', this.postForm.get('endDate')?.value);

      this.postService.updatePost(formData).subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onEditPostEventEmitter.emit();
          if (response.statusCode === 200) {
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
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        // 5 MB size limit
        this.fileError = 'Image size should not exceed 5MB.';
        return;
      }

      // Clear error and set file in form
      this.fileError = null;
      this.postForm.get('postFilepath')?.setValue(file);

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
