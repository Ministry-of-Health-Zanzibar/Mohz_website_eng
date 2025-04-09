import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public baseUrl = 'http://localhost:9095';

  constructor(private http:HttpClient) { }

    public allPermissions(): Observable<any> {
      const href = `${this.baseUrl}/api/permissions`;
      return this.http.get<any>(href);
    }
  
    public getAllRoles(): Observable<any> {
      const href = `${this.baseUrl}/api/roles`;
      return this.http.get<any>(href);
    }
  
    public addRoles(roles: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/roles`, roles);
    }
  
    public deleteRole(id:any): Observable<any>{
      return this.http.delete(`${this.baseUrl}roles/${id}`);
    }
  
    public updateRoles(roles:any, id:any): Observable<any>{
      return this.http.patch(`${this.baseUrl}roles/${id}`,roles)
    }
  
  
    public displayRolesPermission(id:any): Observable<any>{
      return this.http.get(`${this.baseUrl}roles/${id}`);
    }



}
