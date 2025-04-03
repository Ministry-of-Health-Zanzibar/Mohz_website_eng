import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPartner(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}partners/create`,
      data
    );
  }

  public getAllPartners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}partners`);
  }

  public findPartnerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}partners/${id}`);
  }

  public updatePartner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}partners/update`, data);
  }

  public deletePartner(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}partners/delete/${id}`);
  }
}
