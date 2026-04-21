import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
servicios: any[] = [];
showForm = false;
cargando = true;
nueva = { servicio_id: '', fecha_cita: '', hora_cita: '', observaciones: '' };
mensaje = '';

constructor(private citaService: CitaService, private servicioService: ServicioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  this.cargarCitas();
  this.servicioService.getServicios().subscribe((data: any) => this.servicios = data);
}

  cargarCitas() {
  this.cargando = true;
  this.citaService.getCitas().subscribe({
    next: (data: any) => {
      this.citas = data;
      this.cargando = false;
      this.cdr.detectChanges();
    },
    error: () => this.cargando = false
  });
  }

  crearCita() {
    this.citaService.crearCita(this.nueva).subscribe({
      next: () => {
        this.mensaje = '¡Cita reservada correctamente!';
        this.showForm = false;
        this.nueva = { servicio_id: '', fecha_cita: '', hora_cita: '', observaciones: '' };
        this.cargarCitas();
      },
      error: () => this.mensaje = 'Error al crear la cita'
    });
  }

  eliminarCita(id: number) {
    this.citaService.eliminarCita(id).subscribe(() => this.cargarCitas());
  }

}