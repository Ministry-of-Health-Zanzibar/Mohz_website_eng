import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastService: ToastrService) {}

  public toastSuccess(message: string): void {
    this.toastService.success(message);
  }

  public toastInfo(message: string): void {
    this.toastService.info(message);
  }

  public toastWarning(message: string): void {
    this.toastService.warning(message);
  }

  public toastError(message: string): void {
    this.toastService.error(message);
  }
}
