import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createBanner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}create-banner`, data);
  }

  public getAllBanners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}banners`);
  }

  public updateBanner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}update-banner`, data);
  }

  public findBannerById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}banners/${id}`);
  }

  public deleteBanner(data:any, id: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.apiUrl}delete-banner/${id}`, data
    );
  }

// Restore
public restore(data: any, id: number): Observable<any> {
return this.httpClient.patch(`${this.apiUrl}banner/restore/${id}`, data);
}


}
