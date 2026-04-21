import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';

@Component({
  selector: 'app-admin-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class AdminEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  showForm = false;
  editando = false;
  mensaje = '';
  form = { id: null, nombre: '', email: '', password: '', dni: '', especialidad: '', rol: 'tecnico', disponibilidad: true };

  constructor(private empleadoService: EmpleadoService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargarEmpleados(); }

  cargarEmpleados() {
  this.empleadoService.getEmpleados().subscribe({
    next: (data: any) => {
      this.empleados = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.log('Error:', err)
  });
}

  nuevo() {
    this.form = { id: null, nombre: '', email: '', password: '', dni: '', especialidad: '', rol: 'tecnico', disponibilidad: true };
    this.editando = false;
    this.showForm = true;
  }

  editar(emp: any) {
  console.log('Empleado a editar:', emp);
  this.form = {
    id: emp.id,
    nombre: emp.usuario?.nombre,
    email: emp.usuario?.email,
    password: '',
    dni: emp.dni,
    especialidad: emp.especialidad,
    rol: emp.usuario?.rol,
    disponibilidad: emp.disponibilidad
  };
  this.editando = true;
  this.showForm = true;
}

  guardar() {
    if (this.editando) {
      this.empleadoService.actualizarEmpleado(this.form.id!, this.form).subscribe({
        next: () => {
          this.mensaje = 'Empleado actualizado correctamente';
          this.showForm = false;
          this.cargarEmpleados();
          setTimeout(() => this.mensaje = '', 3000);
        }
      });
    } else {
      this.empleadoService.crearEmpleado(this.form).subscribe({
        next: () => {
          this.mensaje = 'Empleado creado correctamente';
          this.showForm = false;
          this.cargarEmpleados();
          setTimeout(() => this.mensaje = '', 3000);
        }
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe(() => this.cargarEmpleados());
    }
}
}