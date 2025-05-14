import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OurServiceService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createOurService(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}our_services`, data);
  }

  public getAllOurServices(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}our_services`);
  }

  public findOurServiceById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}our_services/${id}`);
  }

  public updateOurService(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}our_services/${id}`, data);
  }

  public deleteOurService(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}our_services/${id}`);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(
      `${this.apiUrl}our_services/restore/${id}`,
      data
    );
  }
}
