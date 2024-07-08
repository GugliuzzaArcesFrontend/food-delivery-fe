import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token!: string | null;
  user!: User | null;
  cart:CartItem[]=[];
  cartqntt:number=0

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.authService.token$.subscribe((token: any) => {
      this.token = token;
    })
    this.authService.authedUser$.subscribe((user: User | null) => this.user = user)
    this.cart=this.cartService.cartItems
    this.cartqntt=this.cartService.cartQuantity
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}