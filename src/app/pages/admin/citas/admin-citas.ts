import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-admin-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class AdminCitasComponent implements OnInit {
  citas: any[] = [];
  mensaje = '';

  constructor(private citaService: CitaService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarCitas();
  }

  cargarCitas() {
      this.citaService.getCitas().subscribe({
      next: (data: any) => {
        this.citas = data;
        this.cdr.detectChanges();
      }
    });  }

  cambiarEstado(id: number, estado: string) {
    this.citaService.actualizarCita(id, { estado }).subscribe({
      next: () => {
        this.mensaje = 'Estado actualizado correctamente';
        this.cargarCitas();
        setTimeout(() => this.mensaje = '', 3000);
      }
    });
  }

  eliminarCita(id: number) {
    if (confirm('¿Seguro que quieres eliminar esta cita?')) {
      this.citaService.eliminarCita(id).subscribe(() => this.cargarCitas());
    }
  }
}