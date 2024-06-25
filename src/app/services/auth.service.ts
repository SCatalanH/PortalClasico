// auth.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        this.currentUserSubject.next(this.decodeToken(token));
      }
    }
  }

  register(credentials: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (this.isBrowser) {
          const token = response.token;
          localStorage.setItem('token', token);
          this.currentUserSubject.next(this.decodeToken(token));
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  updateProfile(updatedData: { username: string, email: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/update`, updatedData, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap((user: any) => {
        if (this.isBrowser) {
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
    }
  }

  private decodeToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user;
    } catch (e) {
      return null;
    }
  }
}
