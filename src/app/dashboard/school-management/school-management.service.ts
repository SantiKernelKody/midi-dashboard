import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolManagementService {
  private baseUrl = 'http://localhost:8000/api/v1/dashboard/management';

  constructor(private http: HttpClient) { }

  getSchools(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_schools?page=${page}&size=${size}`);
  }
  getSchool(schoolId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_school/${schoolId}`);
  }

  createSchool(schoolData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_school`, schoolData);
  }

  editSchool(schoolId: number, schoolData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit_school/${schoolId}`, schoolData);
  }

  deleteSchool(schoolId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_school/${schoolId}`);
  }
}
