import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { NgFor } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  template: `
    <p>
      cart works!
    </p>
    @for (product of user.cart; track $index) {
      <p>{{product.pid}} in numero: {{product.qntt}}</p>
    }
  `,
  styles: ``
})
export class CartComponent implements OnInit {
  user!: User

  constructor(private authService: AuthService, private productsService: ProductsService) { }
  ngOnInit(): void {
    this.authService.authedUser$.subscribe(user => this.user = user != null ? JSON.parse(user) : undefined)
  }
}