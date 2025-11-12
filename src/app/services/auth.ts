import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:5010';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser = signal<any | null>(null);

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${apiUrl}/users?email=${email}&password=${password}`).pipe(
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
}