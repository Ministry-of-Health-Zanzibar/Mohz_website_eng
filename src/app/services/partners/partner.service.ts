import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createPartner(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/partners/create`,
      data
    );
  }

  public getAllPartners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/partners`);
  }

  public findPartnerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/partners/${id}`);
  }

  public updatePartner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/partners/update`, data);
  }

  public deletePartner(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/partners/delete/${id}`);
  }
}
