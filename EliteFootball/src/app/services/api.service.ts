import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWelcomeMessage() {
    return this.http.get(`${this.apiUrl}`);
  }

  getTopGiocatori(ruolo: string) {
    return this.http.get<any[]>(`${this.apiUrl}/api/giocatori/top/${ruolo}`);
  }
  
  getTopAllenatori() {
    return this.http.get<any[]>(`${this.apiUrl}/api/allenatori/top`);
  }

  getCitazioni() {
    return this.http.get<any[]>(`${this.apiUrl}/api/citazioni`);
  }
  getGiocatoreById(id: number) {
  return this.http.get<any>(`${this.apiUrl}/api/giocatori/${id}`);
  }
  getAllGiocatori() {
  return this.http.get<any[]>(`${this.apiUrl}/api/giocatori`);
  }

  register(email: string, password: string) {
  return this.http.post(`${this.apiUrl}/api/auth/register`, { email, password });
  }

  login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/auth/login`, { email, password });
  }

  saveFormazione(formazione: { nome: string, modulo: string, giocatori: any[] }) {
  const token = localStorage.getItem('token');
  return this.http.post(
    `${this.apiUrl}/api/formazioni`,
    formazione,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  }
  getFormazioni() {
    const token = localStorage.getItem('token');
    return this.http.get(
      `${this.apiUrl}/api/formazioni`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  updateFormazione(id: number, formazione: any) {
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiUrl}/api/formazioni/${id}`,
      formazione,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  deleteFormazione(id: number) {
    const token = localStorage.getItem('token');
    return this.http.delete(
      `${this.apiUrl}/api/formazioni/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } 

  getEventiLive() {
  return this.http.get('https://api-football-v1.p.rapidapi.com/v3/fixtures?league=135&season=2024', {
    headers: {
      'X-RapidAPI-Key': 'LA_TUA_API_KEY',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  });
}
}


