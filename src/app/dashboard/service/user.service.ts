import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8000/api/v1/dashboard/user';

    constructor(private http: HttpClient) { }
    getUserInfo(): Observable<any> {
        return this.http.get(`${this.baseUrl}/get_user_info`);
    }
    updateUser(data: { name: string; last_name: string; email: string }): Observable<any> {
        return this.http.put(`${this.baseUrl}/update_user`, data);
    }

    changePassword(data: { old_password: string; new_password: string }): Observable<any> {
        return this.http.put(`${this.baseUrl}/change_password`, data);
    }
}
