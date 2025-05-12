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
    return this.httpClient.post<any>(`${this.apiUrl}create-news`, data);
  }

  public getAllNews(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}news`);
  }

  public findNewsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}news/${id}`);
  }

  public updateNews(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}update-news`, data);
  }

  public deleteNews(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}delete-news/${id}`);
  }

  // Restore
public restore(data: any, id: number): Observable<any> {
  return this.httpClient.patch(`${this.apiUrl}news/restore/${id}`, data);
  }

}
