import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrganizationStructureService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createOrganization(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}organizations`, data);
  }

  public getAllOrganizations(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}organizations`);
  }

  public getPublicAllOrganizations(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/Organization`);
  }

  public findPublicOrganizationById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/Organization/${id}`);
  }

  public findOrganizationById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}organizations/${id}`);
  }

  public updateOrganization(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}organizations/update/${id}`,
      data
    );
  }

  public deleteOrganization(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}organizations/${id}`);
  }

  public unblockOrganization(id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}organizations/restore/${id}`,
      {}
    );
  }
}
