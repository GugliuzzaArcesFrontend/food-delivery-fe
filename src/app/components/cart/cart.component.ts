import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgFor } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  template: `
    <p>
      cart works!
    </p>
    @for (product of cart; track $index) {
      <p>{{product.product.name}} in numero: {{product.quantity}}</p>
    }
  `,
  styles: ``
})
export class CartComponent implements OnInit {
  // user!: User
  cart!:CartItem[]

  constructor(private authService: AuthService, private productsService: ProductsService, private cartService:CartService) { }
  ngOnInit(): void {
    // this.authService.authedUser$.subscribe(user => this.user = user != null ? JSON.parse(user) : undefined)
    this.cart=this.cartService.getCartItems()
  }
}