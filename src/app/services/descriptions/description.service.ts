import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {
private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createDescription(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}descriptions`,
      data
    );
  }

  public getAllDescriptions(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}descriptions`);
  }
   public getPublicAllDescriptions(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/descriptions`);
  }

    public findPublicDescriptionById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/descriptions/${id}`);
  }

  public findDescriptionById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}descriptions/${id}`);
  }

  public updateDescription(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}descriptions/${id}`, data);
  }

  public deleteDescription(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}descriptions/${id}`);
  }


  // public restoreDeletedDescription(data: any): Observable<any> {
  //   return this.httpClient.patch<any>(`${this.apiUrl}dp/descriptions/restore-descriptions/{id}`, data);
  // }
}
