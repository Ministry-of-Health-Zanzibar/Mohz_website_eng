import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GalleryTypeService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createGalleryType(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}gallery_types`, data);
  }

  public getAllGalleryTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}gallery_types`);
  }

  public findGalleryTypeById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}gallery_types/${id}`);
  }

  public updateGalleryType(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}gallery_types/${id}`, data);
  }

  public deleteGalleryType(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}gallery_types/${id}`);
  }

  public unblockGalleryType(data: any, id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}gallery_types/restore/${id}`,
      data
    );
  }
}
