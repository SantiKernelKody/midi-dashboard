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

  getCourses(schoolId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_courses/${schoolId}`);
  }
  getCourse(courseId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_course/${courseId}`);
  }

  editCourse(courseId: number, courseData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit_course/${courseId}`, courseData);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_course/${courseId}`);
  }
  getTeachers(schoolId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_teachers/${schoolId}`);
  }

  createTeacher(schoolId: number, teacherData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_teacher?school_id=${schoolId}`, teacherData);
  }
  createCourse(schoolId: number, courseData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_course/${schoolId}`, courseData);
  }

  deleteTeacher(teacherId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete_teacher/${teacherId}`);
  }

  getKids(courseId: number, page: number = 1, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get_kids/${courseId}`, {
      params: {
        page: page.toString(),
        size: size.toString(),
      }
    });
  }

  // Obtener la información de un estudiante
  getPlayerInfo(playerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get_player_info/${playerId}`);
  }

  // Crear un nuevo estudiante
  createKid(courseId: number, kidData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_kid/${courseId}`, kidData);
  }

  // Editar un estudiante existente
  editKid(kidId: number, kidData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/edit_kid/${kidId}`, kidData);
  }

  // Eliminar un estudiante
  deleteKid(kidId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete_kid/${kidId}`);
  }
}
