import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ROLES } from '../shared/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = 'http://localhost:8000/api/v1/auth'; // URL de tu API de autenticación
    private tokenKey = 'access_token';

    constructor(private http: HttpClient, private router: Router) { }
    verifySignupToken(token: string): Observable<any> {
        return this.http.get(`${this.authUrl}/verify_signup_token`, { params: { token } });
    }

    signup(signupData: any): Observable<any> {
        return this.http.post(`${this.authUrl}/signup`, signupData);
    }
    requestResetPassword(email: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = { email: email, };
        return this.http.post<any>(`${this.authUrl}/request_reset_password`, body, { headers });
    }

    verifyResetPasswordToken(token: string): Observable<any> {
        return this.http.get(`${this.authUrl}/verify_reset_password_token`, {
            params: { token }
        });
    }

    resetPassword(token: string, newPassword: string): Observable<any> {
        return this.http.post(`${this.authUrl}/reset_password`, { token, new_password: newPassword });
    }

    login(username: string, password: string, role: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = { email: username, rawpassword: password, role_name: role };

        return this.http.post<any>(`${this.authUrl}/login`, body, { headers }).pipe(
            tap(response => {
                if (response && response.access_token) {
                    console.log('Token recibido:', response.access_token);
                    this.setSession(response, role);
                }
            }),
            catchError(this.handleError)
        );
    }

    private setSession(authResult: any, role: string): void {
        localStorage.setItem('access_token', authResult.access_token);
        localStorage.setItem("role", role);
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem("role");
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
    getUserRole(): string | null {
        return localStorage.getItem("role");
    }
    isAdmin(): boolean {
        return this.getUserRole() === ROLES.ADMIN;
    }
    isParent(): boolean {
        return this.getUserRole() === ROLES.PARENT;
    }
    isTeacher(): boolean {
        return this.getUserRole() === ROLES.TEACHER;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            if (error.status === 401) {
                errorMessage = 'Unauthorized: Invalid username or password';
            } else if (error.status === 403) {
                errorMessage = 'Forbidden: Access is denied';
            } else if (error.status === 500) {
                errorMessage = 'Internal Server Error';
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
