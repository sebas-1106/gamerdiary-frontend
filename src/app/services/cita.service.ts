import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  private headers() {
  return new HttpHeaders({ 
    Authorization: `Bearer ${this.auth.getToken()}`,
    'Content-Type': 'application/json'
  });
}

  getCitas() {
    return this.http.get(`${this.apiUrl}/citas`, { headers: this.headers() });
  }

  crearCita(data: any) {
    return this.http.post(`${this.apiUrl}/citas`, data, { headers: this.headers() });
  }

  actualizarCita(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/citas/${id}`, data, { headers: this.headers() });
  }

  eliminarCita(id: number) {
    return this.http.delete(`${this.apiUrl}/citas/${id}`, { headers: this.headers() });
  }
}
