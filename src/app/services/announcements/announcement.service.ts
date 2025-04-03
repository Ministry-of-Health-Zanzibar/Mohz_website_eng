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
    return this.httpClient.post<any>(
      `${this.apiUrl}announcements/create`,
      formData
    );
  }

  public getAllAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}announcements/all`);
  }

  public findAnnouncementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}announcements/${id}`);
  }

  public updateAnnouncement(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}announcements/update/${id}`, data);
  }

  public deleteAnnouncement(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}announcements/delete/${id}`);
  }

// Restore
public restore(data: any, id: number): Observable<any> {
return this.httpClient.patch(`${this.apiUrl}announcements/restore/${id}`, data);
}

}
