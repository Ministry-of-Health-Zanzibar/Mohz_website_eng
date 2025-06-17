import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPublication(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}publications`, data);
  }

  public getAllPublications(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}publications`);
  }

  public findPublication(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}publications/${id}`);
  }

  public updatePublication(data: any, publicationId: number): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}publications/update/${publicationId}`,
      data
    );
  }

  public deletePublication(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}publications/${id}`);
  }

  public unblockPublication(id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}publications/restore/${id}`,
      {}
    );
  }

  public getPublicPublicationsByType(typeName: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/api/public/publications/type/${typeName}`
    );
  }
}
