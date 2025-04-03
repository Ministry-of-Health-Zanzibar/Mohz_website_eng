import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SiteLinkService {
private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createSiteLink(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}create-sitelinks`, data);
  }

  public getAllSitelinks(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}sitelinks`);
  }

  public findSitelinkById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}sitelinks/${id}`);
  }

  public updateSitelink(data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}update-sitelinks`, data);
  }

  public deleteSitelink(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}delete-sitelinks/${id}`);
  }
}
