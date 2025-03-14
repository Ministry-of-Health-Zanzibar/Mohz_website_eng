import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostTypeService {
// private apiUrl = environment.baseUrl;
  private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createPostType(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/types/create`,
      data
    );
  }

  public getAllPostTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/types/all`);
  }


  public findTypePostById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/types/${id}`);
  }

  public updatePostType(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/types/update/${id}`, data);
  }

  public deletePostType(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/types/delete/${id}`);
  }

  public restoreDeletedPostType(data: any, id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}/api/types/restore/${id}`, data);
  }
}
