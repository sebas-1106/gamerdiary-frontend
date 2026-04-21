import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';
import { HttpClient } from '@angular/common/http';
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

  constructor(private servicioService: ServicioService, private http: HttpClient, private cdr: ChangeDetectorRef) {}

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
    const url = this.editando
      ? `${environment.apiUrl}/servicios/${this.form.id}`
      : `${environment.apiUrl}/servicios`;
    const method = this.editando ? 'put' : 'post';

    this.http[method](url, this.form).subscribe({
      next: () => {
        this.mensaje = this.editando ? 'Servicio actualizado' : 'Servicio creado';
        this.showForm = false;
        this.cargarServicios();
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este servicio?')) {
      this.http.delete(`${environment.apiUrl}/servicios/${id}`).subscribe(() => this.cargarServicios());
    }
  }
}