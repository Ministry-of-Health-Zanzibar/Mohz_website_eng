import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostTypeService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPostType(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}types/create`,
      data
    );
  }

  public getAllPostTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}types/all`);
  }


  public findTypePostById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}types/${id}`);
  }

  public updatePostType(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}types/update/${id}`, data);
  }

  public deletePostType(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}types/delete/${id}`);
  }

  public restoreDeletedPostType(data: any, id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}types/restore/${id}`, data);
  }
}
