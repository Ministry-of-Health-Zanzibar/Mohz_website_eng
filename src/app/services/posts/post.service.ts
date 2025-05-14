import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createPost(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}posts`, data);
  }

  public getAllPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/all`);
  }

  public getPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/type/Post`);
  }

  public getProjectPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/type/Project`);
  }

  public getEventPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/type/Event`);
  }

  public getTenderPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/type/Tender`);
  }

  public getPublicationPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/type/Publication`);
  }

  public getPostByType(typeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}post/type/${typeId}`);
  }

  public deletePostByType(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}types/delete/${id}`);
  }

  public findPostById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}posts/${id}`);
  }

  public updatePost(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}posts/update`, data);
  }

  public deletePost(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}posts/delete/${id}`);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}posts/restore/${id}`, data);
  }

  // Restore
  public restorePostType(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl} types/restore/${id}`, data);
  }
}
