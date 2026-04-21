import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getServicios() {
    return this.http.get(`${this.apiUrl}/servicios`);
  }

  getServicio(id: number) {
    return this.http.get(`${this.apiUrl}/servicios/${id}`);
  }
}