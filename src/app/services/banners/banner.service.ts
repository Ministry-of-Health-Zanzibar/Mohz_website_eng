import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createBanner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/banner`, data);
  }

  public getAllBanners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/banner`);
  }

  public updateBanner(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/banner/${id}`, data);
  }

  public findBannerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/banner/${id}`);
  }

  public deleteBanner(data: any, id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/banner/${id}`, data);
  }

  // Restore
  public restore(data: any, id: number): Observable<any> {
    return this.httpClient.patch(
      `${this.apiUrl}/api/banner/restore/${id}`,
      data
    );
  }
}
