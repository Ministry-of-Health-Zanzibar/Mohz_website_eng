import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinistrySystemService {

  private apiUrl = 'http://localhost:9095';

  constructor(private httClient:HttpClient) { }


   public createMinistrySystem(formData: any): Observable<any> {
      return this.httClient.post<any>(
        `${this.apiUrl}/api/ministrysystem/create`,
        formData
      );
    }
  
    public getAllMinistrySystem(): Observable<any> {
      return this.httClient.get<any>(`${this.apiUrl}/api/ministrysystem/all`);
    }
  
    public findMinistrySystemById(id: number): Observable<any> {
      return this.httClient.get<any>(`${this.apiUrl}/api/ministrysystem/${id}`);
    }
  
    public updateMinistrySystem(data: any): Observable<any> {
      return this.httClient.post<any>(`${this.apiUrl}/api/ministrysystem/update`, data);
    }
  
    public deleteMinistrySystem(data: any, id: number): Observable<any> {
      return this.httClient.delete<any>(`${this.apiUrl}/api/ministrysystem/delete/${id}`, data);
    }

 
  // Restore MinistrySystem
  public restore(data: any, id: number): Observable<any> {
  return this.httClient.patch(`${this.apiUrl}/api/ministrysystem/restore/${id}`, data);
}
}
