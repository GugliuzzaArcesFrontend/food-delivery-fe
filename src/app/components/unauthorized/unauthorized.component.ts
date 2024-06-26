import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <div><p>Accesso non autorizzato, effettuare il login con un altro utente</p></div>
    <app-login/>
  `,
  styles: ``
})
export class UnauthorizedComponent {

}
