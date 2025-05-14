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

  public getPublicAllMinistrySystem(): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}/public/ministry`);
  }

  public findPublicMinistrySystemById(id: number): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}/public/ministrys/${id}`);
  }

  public findMinistrySystemById(id: number): Observable<any> {
    return this.httClient.get<any>(`${this.apiUrl}ministrys/${id}`);
  }

  public updateMinistrySystem(data: any, id: number): Observable<any> {
    return this.httClient.post<any>(`${this.apiUrl}ministrysystem/${id}`, data);
  }

  public deleteMinistrySystem(data: any, id: number): Observable<any> {
    return this.httClient.delete<any>(
      `${this.apiUrl}ministrysystem/delete/${id}`,
      data
    );
  }

  // Restore MinistrySystem
  public restore(data: any, id: number): Observable<any> {
    return this.httClient.patch(
      `${this.apiUrl}ministrysystem/restore/${id}`,
      data
    );
  }
}
