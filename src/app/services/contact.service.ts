import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://localhost:9095';

  constructor(private httpClient:HttpClient) { }

   public registerTeamMember(data: any): Observable<any> {
      return this.httpClient.post<any>(
        `${this.baseUrl}/api/comments`,
        data
      );
    }

}
