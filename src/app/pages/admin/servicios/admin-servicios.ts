import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class AdminServiciosComponent implements OnInit {
  servicios: any[] = [];
  showForm = false;
  editando = false;
  mensaje = '';
  form = { id: null, nombre_servicio: '', descripcion: '', precio: '', categoria: '', imagen_url: '' };

  constructor(
    private servicioService: ServicioService, 
    private http: HttpClient, 
    private cdr: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  private headers() {
  return new HttpHeaders({
    Authorization: `Bearer ${this.auth.getToken()}`,
    'Content-Type': 'application/json'
  });
}
  ngOnInit() { this.cargarServicios(); }

  cargarServicios() {
    this.servicioService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data;
        this.cdr.detectChanges();
      }
    });  }

  nuevo() {
    this.form = { id: null, nombre_servicio: '', descripcion: '', precio: '', categoria: '', imagen_url: '' };
    this.editando = false;
    this.showForm = true;
  }

  editar(servicio: any) {
    this.form = { ...servicio };
    this.editando = true;
    this.showForm = true;
  }

   guardar() {
  if (this.editando) {
    this.http.put(`${environment.apiUrl}/servicios/${this.form.id}`, this.form, { headers: this.headers() }).subscribe({
      next: () => {
        this.mensaje = 'Servicio actualizado';
        this.showForm = false;
        this.cargarServicios();
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => console.log('Error:', err)
    });
  } else {
    this.http.post(`${environment.apiUrl}/servicios`, this.form, { headers: this.headers() }).subscribe({
      next: () => {
        this.mensaje = 'Servicio creado';
        this.showForm = false;
        this.cargarServicios();
        setTimeout(() => this.mensaje = '', 3000);
      },
      error: (err) => console.log('Error:', err)
    });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este servicio?')) {
      this.http.delete(`${environment.apiUrl}/servicios/${id}`, { headers: this.headers() }).subscribe(() => this.cargarServicios());
    }
  }
}