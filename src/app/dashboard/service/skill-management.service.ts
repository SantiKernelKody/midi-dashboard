import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillManagementService {
  private apiUrl = 'http://localhost:8000/api/v1/dashboard/skills';
  constructor(private http: HttpClient) { }

  getSkills(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills?page=${page}&size=${size}`);
  }

  getAllSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills?all=true`);
  }

  getSkill(skillId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/skills/${skillId}`);
  }

  createSkill(skillData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_skill`, skillData);
  }

  updateSkill(skillId: number, skillData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/skills/${skillId}`, skillData);
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skills/${skillId}`);
  }

  getGames(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/games?page=${page}&size=${size}`);
  }

  getLevelsForGame(gameId: number, page: number = 1, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/game/${gameId}/levels?page=${page}&size=${size}`);
  }


  getLevelWithSkills(levelId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/level/${levelId}`);
  }

  updateLevel(levelId: number, levelData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/level/${levelId}`, levelData);
  }
}
