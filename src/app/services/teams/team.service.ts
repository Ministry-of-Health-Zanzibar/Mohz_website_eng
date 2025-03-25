import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
// private apiUrl = environment.baseUrl;
  private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public registerTeamMember(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/create_team`,
      data
    );
  }

  public getAllTeams(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/team`);
  }

  public findTeamById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/team_byID/${id}`);
  }

  updateTeamMember(id: number, data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/update_team`, data);
  }
  
  
  

  public deleteTeam(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/delete_team/${id}`);
  }
}
