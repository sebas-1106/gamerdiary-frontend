import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
  return this.http.post(`${this.apiUrl}/login`, data).pipe(
    tap((res: any) => {
      console.log('Respuesta login:', res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
    })
  );
}

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
      })
    );
  }

  getToken() { return localStorage.getItem('token'); }
  getUsuario() { return JSON.parse(localStorage.getItem('usuario') || '{}'); }
  isLoggedIn() { return !!this.getToken(); }
  isAdmin() { return this.getUsuario()?.rol === 'admin'; }
}