import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteLinkService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createSiteLink(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/create-sitelinks`, data);
  }

  public getAllSitelinks(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/sitelinks`);
  }

  public findSitelinkById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/sitelinks/${id}`);
  }

  public updateSitelink(data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/update-sitelinks`, data);
  }

  public deleteSitelink(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/delete-sitelinks/${id}`);
  }
}
