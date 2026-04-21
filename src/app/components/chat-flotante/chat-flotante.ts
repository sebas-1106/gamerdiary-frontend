import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-flotante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-flotante.html',
  styleUrl: './chat-flotante.css',
})
export class ChatFlotanteComponent implements OnInit {
  abierto = false;
  mensajes: any[] = [];
  inputMensaje = '';
  cargando = false;

  constructor(
    private chatService: ChatService,
    public auth: AuthService,
  ) {}

  ngOnInit() {}

toggleChat() {
  this.abierto = !this.abierto;
  if (this.abierto && this.mensajes.length === 0 && this.auth.isLoggedIn()) {
    this.chatService.getHistorial().subscribe({
      next: (data: any) => this.mensajes = data,
      error: () => {}
    });
  }
}

  enviar() {
    if (!this.inputMensaje.trim() || this.cargando || !this.auth.isLoggedIn()) return;

    const mensaje = this.inputMensaje;
    this.inputMensaje = '';
    this.cargando = true;

    this.mensajes.push({ mensaje, respuesta_ia: null });
    this.scrollAbajo();

    this.chatService.enviarMensaje(mensaje).subscribe({
      next: (res: any) => {
        this.mensajes[this.mensajes.length - 1].respuesta_ia = res.respuesta_ia;
        this.cargando = false;
        this.scrollAbajo();
      },
      error: () => {
        this.mensajes[this.mensajes.length - 1].respuesta_ia =
          'Error al conectar con el asistente.';
        this.cargando = false;
      },
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviar();
    }
  }

  scrollAbajo() {
    setTimeout(() => {
      const container = document.querySelector('.chat-mensajes');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
