import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createAboutUs(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/AboutUs/create`, data);
  }

  public getAllAboutUsData(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/AboutUs/all`);
  }

  public updateAboutUs(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/AboutUs/update`, data);
  }

  public findAboutUsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/AboutUs/${id}`);
  }

  public deleteAboutUs(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.apiUrl}/api/AboutUs/delete/${id}`
    );
  }

   // Restore 
   public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}/api/AboutUs/restore/${id}`, data);
  }
}
