import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  public registerTeamMember(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}create_team`,
      data
    );
  }

  public getAllTeams(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}team`);
  }

  public findTeamById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}team_byID/${id}`);
  }

  updateTeamMember(id: number, data: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}update_team`, data);
  }




  public deleteTeam(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}delete_team/${id}`);
  }
}
