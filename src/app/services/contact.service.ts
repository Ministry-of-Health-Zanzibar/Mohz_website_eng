import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient:HttpClient) { }

   public registerTeamMember(data: any): Observable<any> {
      return this.httpClient.post<any>(
        `${this.baseUrl}comments`,
        data
      );
    }

}
