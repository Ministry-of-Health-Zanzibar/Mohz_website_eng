import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tenderSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  notifyNewTender() {
    this.tenderSubject.next(true);
  }

  getTenderNotification() {
    return this.tenderSubject.asObservable();
  }
}
