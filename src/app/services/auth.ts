// src/app/services/auth.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  
  public currentUser = signal<any | null>(null);

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          return users[0]; 
        }
        throw new Error('Usuário não encontrado');
      }),
      tap(user => {
        this.currentUser.set({ ...user, type: 'user' });
      }),
      catchError(err => {
        return throwError(() => new Error('E-mail ou senha inválidos!'));
      })
    );
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/admins?email=${email}&password=${password}`).pipe(
      map(admins => {
        if (admins.length > 0) {
          return admins[0];
        }
        throw new Error('Administrador não encontrado');
      }),
      tap(admin => {
        this.currentUser.set({ ...admin, type: 'admin' });
      }),
      catchError(err => {
        return throwError(() => new Error('E-mail ou senha de administrador inválidos!'));
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login-user']); 
  }

  updateCurrentUser(userData: any): void {
    const currentUser = this.currentUser();
    if (currentUser) {
      this.currentUser.set({ ...currentUser, ...userData });
    }
  }
}