import { Component, effect, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product';
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, SearchbarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token!: string | null;
  user!: User | null;
  cart: CartItem[] = [];
  cartqntt: number = 0

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {
    effect(() => {
      this.cartqntt = this.cartService.getCartItems().reduce((acc, item) => {
        return acc + item.quantity
      }, 0)
    })
  }

  ngOnInit() {
    this.authService.token$.subscribe((token: any) => {
      this.token = token;
    })
    this.authService.authedUser$.subscribe((user: User | null) => this.user = user)
    /* this.cart=this.cartService.cartItems */
    /* this.cartqntt=this.cartService.cartCount() */
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}