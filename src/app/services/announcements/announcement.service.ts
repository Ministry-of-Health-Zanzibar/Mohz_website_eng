import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createAnnouncement(formData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}announcement`, formData);
  }

  public getAllAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}announcement`);
  }

  public getAllPublicAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/announcement`);
  }

  public findPublicAnnouncementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/announcement/${id}`);
  }             

  public findAnnouncementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}announcement/${id}`);
  }

  public updateAnnouncement(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}announcement/${id}`, data);
  }

  public deleteAnnouncement(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}announcement/${id}`);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(
      `${this.apiUrl}announcement/restore/${id}`,
      data
    );
  }
}
