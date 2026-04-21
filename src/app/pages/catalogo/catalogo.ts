import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  servicios: any[] = [];
  loading = true;

  constructor(private servicioService: ServicioService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.servicioService.getServicios().subscribe({
      next: (data: any) => {
        this.servicios = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => this.loading = false
    });
  }
}