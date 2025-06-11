import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DepartmentProgramService {
private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createDepartmentProgram(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}dp`,
      data
    );
  }

  public getAllDepartmentPrograms(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}dp`);
  }

   public getPublicAllDepartmentPrograms(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/dp`);
  }

   public findPublicDepartmentProgramById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/dp/${id}`);
  }

  public findDepartmentProgramById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}dp/${id}`);
  }

  public updateDepartmentProgram(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}dp/${id}`, data);
  }

  public deleteDepartmentProgram(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}dp/${id}`);
  }


  public restoreDeletedDepartmentProgram(data: any, id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}dp/restore/${id}`, data);
  }
}
