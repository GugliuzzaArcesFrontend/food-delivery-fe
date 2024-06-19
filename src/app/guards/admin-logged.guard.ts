import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminLoggedGuard implements CanActivate, OnInit {

  user!: User | null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.authedUser$.subscribe(user => user = user != null ? JSON.parse(user) : null);
    this.authService.authedUser$.subscribe((user: string | null) => this.user = user != null ? JSON.parse(user) : null)
  }
  canActivate(): Observable<boolean> {
    return of(this.user?.role == 'admin')
  }
}