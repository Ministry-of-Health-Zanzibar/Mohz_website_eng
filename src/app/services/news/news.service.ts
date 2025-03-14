import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  // private apiUrl = environment.baseUrl;
  private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createNews(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/create-news`, data);
  }

  public getAllNews(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/news`);
  }

  public findNewsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/news/${id}`);
  }

  public updateNews(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/update-news`, data);
  }

  public deleteNews(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/delete-news/${id}`);
  }

  // Restore 
public restore(data: any, id: number): Observable<any> {
  return this.httpClient.patch(`${this.apiUrl}/api/news/restore/${id}`, data);
  }
  
}
