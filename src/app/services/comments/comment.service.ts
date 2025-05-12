import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createComment(data: any,): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}comment`,
      data
    );
  }

  public getAllComments(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}comment`);
  }

  public getPublicAllComments(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/comment`);
  }

  public findPublicCommentById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/comments/${id}`);
  }

  public findCommentById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}comments/${id}`);
  }

  public updateComment(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.apiUrl}comment/${id}`,
      data
    );
  }

  public deleteComment(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}comments/${id}`);
  }
}
