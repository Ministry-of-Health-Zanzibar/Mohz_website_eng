import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createDescription(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/descriptions/create-description`,
      data
    );
  }

  public getAllDescriptions(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/descriptions`);
  }

  public findDescriptionById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/descriptions/${id}`);
  }

  public updateDescription(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/descriptions/update-descriptions/${id}`, data);
  }

  public deleteDescription(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/descriptions/delete-descriptions/${id}`);
  }


  public restoreDeletedDescription(data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/api/dp/descriptions/restore-descriptions/{id}`, data);
  }
}
