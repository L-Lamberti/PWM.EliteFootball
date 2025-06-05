import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}


