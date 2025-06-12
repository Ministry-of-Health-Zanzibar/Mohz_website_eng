import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MinistrySystemService {
  private apiUrl = environment.baseUrl;

  constructor(private httClient: HttpClient) {}

  public createMinistrySystem(formData: any): Observable<any> {
    return this.httClient.post<any>(`${this.apiUrl}ministrys`, formData);
  }

  public getAllMinistrySystem(): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}ministrys`);
  }

  public findMinistrySystemById(id: number): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}ministrys/${id}`);
  }

  public updateMinistrySystem(data: any, id: number): Observable<any> {
    return this.httClient.post<any>(`${this.apiUrl}ministrys/${id}`, data);
  }

  public deleteMinistrySystem(data: any, id: number): Observable<any> {
    return this.httClient.delete<any>(`${this.apiUrl}ministrys/${id}`, data);
  }

  // Restore MinistrySystem
  public unblockMinistrySystem(data: any, id: number): Observable<any> {
    return this.httClient.patch(`${this.apiUrl}ministrys/restore/${id}`, data);
  }

  public getPublicAllMinistrySystem(): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}public/ministrys`);
  }

  public findPublicMinistrySystemById(id: number): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}public/ministrys/${id}`);
  }
}
