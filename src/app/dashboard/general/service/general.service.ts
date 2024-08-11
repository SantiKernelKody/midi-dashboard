import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    private baseUrl = 'http://localhost:8000/api/v1/dashboard/general'; // URL base de tu API

    constructor(private http: HttpClient) { }

    getGames(): Observable<any> {
        return this.http.get(`${this.baseUrl}/games`);
    }

    getGeneralHeaders(role: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/general_headers_${role}`);
    }

    getGameHeader(role: string, gameId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/game_header_${role}/${gameId}`);
    }

    getKidList(): Observable<any> {
        return this.http.get(`${this.baseUrl}/kid_list`);
    }

    getGeneralBody(role: string, gameId: number, playerId?: number): Observable<any> {
        let url = `${this.baseUrl}/general_body_${role}/${gameId}`;
        if (role === 'parent' && playerId) {
            url += `/${playerId}`;
        }
        return this.http.get(url);
    }
}
