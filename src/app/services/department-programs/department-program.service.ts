import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentProgramService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createDepartmentProgram(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/dp/create-dp`,
      data
    );
  }

  public getAllDepartmentPrograms(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/dp/all`);
  }

  public findDepartmentProgramById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/dp/${id}`);
  }

  public updateDepartmentProgram(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/dp/update/${id}`, data);
  }

  public deleteDepartmentProgram(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/dp/delete/${id}`);
  }


  public restoreDeletedDepartmentProgram(data: any, id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/api/dp/restore/${id}`, data);
  }
}
