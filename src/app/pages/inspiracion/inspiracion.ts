import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inspiracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inspiracion.html',
  styleUrl: './inspiracion.css'
})
export class InspiracionComponent implements OnInit {
  fotos: any[] = [];
  cargando = false;
  pagina = 1;
  readonly accessKey = 'JauoQHCDcvtuqO4TVDlNd5EGKw2sy27sau_UXAH11Ik';
  readonly keywords = ['gaming setup', 'gamer room rgb', 'gaming desk setup', 'esports setup', 'rgb gaming room'];
  keywordActual = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarFotos();
  }

  async cargarFotos() {
    if (this.cargando) return;
    this.cargando = true;

    const keyword = this.keywords[this.keywordActual % this.keywords.length];
    this.keywordActual++;

    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${this.accessKey}&page=${this.pagina}&per_page=20&query=${keyword}&orientation=landscape`
      );
      const data = await res.json();
      this.fotos = [...this.fotos, ...data.results];
      this.pagina++;
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Error cargando fotos', e);
    } finally {
      this.cargando = false;
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 300 && !this.cargando) {
      this.cargarFotos();
    }
  }
}