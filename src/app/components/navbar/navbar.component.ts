import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token!: string | null
  user!: User | null

  constructor(
    private productService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.token$.subscribe((token: any) => {
      this.token = token;
      console.log('Token changed:', this.token); // Aggiungi questo per il debug
    })
    this.authService.authedUser$.subscribe((user: string | null) => this.user = user != null ? JSON.parse(user) : null)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.productService.updateSearchTerm(input.value);
    console.log(input.value);
  }
}
