import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8000/api/v1/auth'; // URL de tu API de autenticación
    private tokenKey = 'access_token';

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string, role: string): Observable<any> {
        return this.http.post<any>(`${this.authUrl}/login`, { username, password }).pipe(
            tap(response => this.setSession(response, role)),
            catchError(this.handleError('login', []))
        );
    }

    private setSession(authResult: any, role: string): void {
        localStorage.setItem(this.tokenKey, authResult.token);
        localStorage.setItem("role", role);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
    getUserRole(): string | null {
        return localStorage.getItem("role");
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
