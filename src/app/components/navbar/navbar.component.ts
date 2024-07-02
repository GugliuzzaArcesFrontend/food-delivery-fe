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
  cartqntt= signal<number>(this.cart.reduce((acc,product)=>acc+product.quantity,0))

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.authService.token$.subscribe((token: any) => {
      this.token = token;
    })
    this.authService.authedUser$.subscribe((user: string | null) => this.user = user != null ? JSON.parse(user) : null)
    this.cart=this.cartService.cartItems
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
