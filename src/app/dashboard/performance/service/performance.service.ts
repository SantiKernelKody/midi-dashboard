import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PerformanceService {
    private baseUrl = 'http://localhost:8000/api/v1/dashboard/performance'; // URL base de tu API

    constructor(private http: HttpClient) { }

    getStages(): Observable<any> {
        return this.http.get(`${this.baseUrl}/get_stages`);
    }

    getSchoolsAdmin(): Observable<any> {
        return this.http.get(`${this.baseUrl}/get_schools_admin`);
    }

    getSchoolsTeacher(): Observable<any> {
        return this.http.get(`${this.baseUrl}/get_schools_teacher`);
    }

    getPerformanceSchool(schoolId: number, startDate: string, endDate: string, stageId: number, gameId: number): Observable<any> {
        let params = new HttpParams()
            .set('school_id', schoolId.toString())
            .set('start_date', startDate)
            .set('end_date', endDate)
            .set('stage_id', stageId.toString())
            .set('game_id', gameId.toString());

        return this.http.get(`${this.baseUrl}/get_performance_school`, { params });
    }
}
