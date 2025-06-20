import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPartner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}partners`, data);
  }

  public getAllPartners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}partners`);
  }

  public getPublicAllPartners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/partners`);
  }

  public findPublicPartnerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/partners/${id}`);
  }

  public findPartnerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}partners/${id}`);
  }

  public updatePartner(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}partners/${id}`, data);
  }

  public deletePartner(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}partners/${id}`);
  }

  public unblockPartner(id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}partners/restore/${id}`,
      {}
    );
  }
}
