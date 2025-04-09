import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // public apiUrl = environment.backendUrl;
  public apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  // public login(
  //   email: string,
  //   password: string
  // ): Observable<HttpResponse<any>> {
  //   return this.httpClient.post<any>(
  //     `${this.apiUrl}/api/login`,
  //     { email, password },
  //     {
  //       observe: 'response',
  //     }
  //   );
  // }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/login`, {
      email,
      password,
    });
  }

  public signup(formData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/userAccounts`, formData);
  }

  public saveToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  public getToken(): string {
    // return this.token;
    return localStorage.getItem('token')!;
  }

  public loadToken(): void {
    localStorage.getItem('token')!;
  }

  public addUserToLocalStorage(user: any | null): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getAllUser(): Observable<any> {
    const href = `${this.apiUrl}/api/userAccounts`;
    return this.httpClient.get<any>(href);
  }

  public updateUser(data: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/api/userAccounts/${id}`, data);
  }

  public findUserById( id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/userAccounts/${id}`);
  }

  public getUserFromLocalStorage(): any {
    // return JSON.parse(localStorage.getItem('user')!);
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }                                                                          

  public isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  changePassword(data: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/changePassword`,data);
  }

  public setRoles(roles: any[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): any[] {
    return JSON.parse(localStorage.getItem('roles') || '[]');
  }

  public rolematch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }


}
