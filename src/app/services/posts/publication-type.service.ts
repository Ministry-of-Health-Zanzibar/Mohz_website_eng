import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PublicationTypeService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPublicationType(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}publicationTypes`, data);
  }

  public getAllPublicationTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}publicationTypes`);
  }

  public findPublicationType(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}publicationTypes/${id}`);
  }

  public updatePublicationType(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.apiUrl}publicationTypes/${id}`,
      data
    );
  }

  public deletePublicationType(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}publicationTypes/${id}`);
  }

  public unblockPublicationType(id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}publicationTypes/restore/${id}`,
      {}
    );
  }
}
