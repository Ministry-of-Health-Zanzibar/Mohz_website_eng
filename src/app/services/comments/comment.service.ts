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

  public createComment(data: any, newsId: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}comments/create/${newsId}`,
      data
    );
  }

  public getAllComments(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}comments/all`);
  }

  public findCommentById(newsId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}comments/${newsId}`);
  }

  public updateComment(data: any, newsId: number): Observable<any> {
    return this.httpClient.put<any>(
      `${this.apiUrl}comments/update/${newsId}`,
      data
    );
  }

  public deleteComment(newsId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}comments/${newsId}`);
  }
}
