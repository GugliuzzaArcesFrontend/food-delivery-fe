import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = 'admin';
  password: string = 'pa123';
  errorMessage: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  login(username: string, password: string) {
    this.authService.login(username, password)
  }
}
