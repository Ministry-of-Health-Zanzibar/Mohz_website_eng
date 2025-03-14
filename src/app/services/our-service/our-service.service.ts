import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServiceService {
 private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createOurService(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/our_services/create`,
      data
    );
  }

  public getAllOurServices(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/our_services/all`);
  }

  public findOurServiceById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/our_services/${id}`);
  }

  public updateOurService(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/our_services/update/${id}`, data);
  }

  public deleteOurService(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/our_services/delete/${id}`);
  }

   // Restore 
   public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/api/our_services/restore/${id}`, data);
  }
}
