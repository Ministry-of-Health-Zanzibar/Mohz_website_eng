import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createNews(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}news`, data);
  }

  public getAllNews(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}news`);
  }

  public getAllPublicNews(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/news`);
  }

  public findPublicNewsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/news/${id}`);
  }

  public findNewsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}news/${id}`);
  }

  public updateNews(data: any, newsId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}news/${newsId}`, data);
  }

  public deleteNews(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}news/${id}`);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(`${this.apiUrl}news/restore/${id}`, data);
  }
}
