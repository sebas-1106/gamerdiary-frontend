import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { ChatFlotanteComponent } from './components/chat-flotante/chat-flotante';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ChatFlotanteComponent],
  templateUrl: './app.html',
})
export class AppComponent {}