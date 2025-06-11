import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createAboutUs(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}aboutus`, data);
  }

  public getAllAboutUsInfo(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}aboutus`);
  }

  public getAllPublicAboutUsData(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/aboutus`);
  }

  public getAllAboutUsPublicData(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/aboutus`);
  }

  public updateAboutUs(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}aboutus/${id}`, data);
  }

  public findAboutUsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}aboutus/${id}`);
  }

  public deleteAboutUs(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}aboutus/${id}`);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}aboutus/restore/${id}`, data);
  }
}
