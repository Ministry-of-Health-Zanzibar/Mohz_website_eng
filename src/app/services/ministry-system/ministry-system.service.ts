import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MinistrySystemService {

  private apiUrl = environment.baseUrl;

  constructor(private httClient:HttpClient) { }


   public createMinistrySystem(formData: any): Observable<any> {
      return this.httClient.post<any>(
        `${this.apiUrl}ministrysystem/create`,
        formData
      );
    }

    public getAllMinistrySystem(): Observable<any> {
      return this.httClient.get<any>(`${this.apiUrl}ministrysystem/all`);
    }

    public findMinistrySystemById(id: number): Observable<any> {
      return this.httClient.get<any>(`${this.apiUrl}ministrysystem/${id}`);
    }

    public updateMinistrySystem(data: any): Observable<any> {
      return this.httClient.post<any>(`${this.apiUrl}ministrysystem/update`, data);
    }

    public deleteMinistrySystem(data: any, id: number): Observable<any> {
      return this.httClient.delete<any>(`${this.apiUrl}ministrysystem/delete/${id}`, data);
    }


  // Restore MinistrySystem
  public restore(data: any, id: number): Observable<any> {
  return this.httClient.patch(`${this.apiUrl}ministrysystem/restore/${id}`, data);
}
}
