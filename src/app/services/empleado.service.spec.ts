import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmpleados() {
    return this.http.get(`${this.apiUrl}/empleados`);
  }

  crearEmpleado(data: any) {
    return this.http.post(`${this.apiUrl}/empleados`, data);
  }

  actualizarEmpleado(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/empleados/${id}`, data);
  }

  eliminarEmpleado(id: number) {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`);
  }
}