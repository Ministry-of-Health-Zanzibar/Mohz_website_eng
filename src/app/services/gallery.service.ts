import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public createGallery(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}galleries`, data);
  }

  public getAllGalleries(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}galleries`);
  }

  public findGalleryById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}galleries/${id}`);
  }

  public updateGallery(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}galleries/${id}`, data);
  }

  public deleteGallery(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}galleries/${id}`);
  }

  public unblockGallery(id: number): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.apiUrl}galleries/restore/${id}`,
      {}
    );
  }

  // Public
  public getAllPublicGalleries(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/galleries`);
  }

  public getAllPublicGalleriesByTypeImage(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}public/galleries/Image`);
  }

  public getAllPublicGalleriesByPressConferenceType(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}public/galleries/Press Conference`
    );
  }

  public getAllPublicGalleriesByConferenceReleaseType(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}public/galleries/Conference Release`
    );
  }
}
