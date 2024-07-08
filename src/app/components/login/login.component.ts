import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = 'emilys'
  password: string = 'emilyspass'
  errorMessage: string = '';
  token!: string | null
  user!: User | null

  constructor(private http: HttpClient, private authService: AuthService, private router:Router) { }
  ngOnInit(): void {
    this.authService.token$.subscribe(token => this.token = token)
    this.authService.authedUser$.subscribe((user: User | null) => this.user = user)
  }

  login(username: string, password: string) {
    this.authService.login(username, password);
    this.router.navigate(['/login'])
    // username=''
    // password=''
  }
  logOut():void{
    this.authService.logout();
  }
}
