import { Component, effect, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, CurrencyPipe, FormsModule],
  template: `
    <p>
      cart works!
    </p>
    @for (product of cart; track $index) {
      @if(product.quantity>1){<button type="button" (click)="decrementCart(product.product.id)">Cala</button>}
      @else {<button type="button" (click)="cartRemove(product.product.id)">Elimina?</button>}
      <p>{{product.product.name}} in numero: <input type="number" [(ngModel)]="product.quantity"></p>
      <p>Prezzo oggetto:{{product.product.price*product.quantity|currency:'EUR'}}</p>
      <button type="button" (click)="incrementCart(product.product.id)">Aumenta</button>
      <br>
      @if(product.quantity>1){<button type="button" (click)="cartRemove(product.product.id)">Rimuovi dal carrello</button><br>}<br>
    }
    @if(cart){
      <p>Prezzo merci:{{cartPrice|currency:'EUR'}}</p>
    }
    <p>Prezzo spedizione:{{deliveryPrice|currency:'EUR'}}</p>
    <p>Totale:{{finalPrice|currency:'EUR'}}</p>
    <button (click)="emptyCart()">Svuota carrello</button>
  `,
  styles: ``
})

export class CartComponent implements OnInit {
  // user!: User
  cart!: CartItem[];
  cartPrice!: number;
  deliveryPrice!: number;
  finalPrice!: number;
  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private cartService: CartService
  ){
    effect(() => {
      this.cartPrice = cartService.CartItems.reduce((acc,item)=>acc+item.quantity*item.product.price,0);
      this.cart = cartService.CartItems
      this.deliveryPrice = cartService.CartItems.reduce((acc, item) => acc + item.quantity * 1.5, 1)
      this.finalPrice = this.cartPrice + this.deliveryPrice
    })
  };
  ngOnInit(): void {
    // this.authService.authedUser$.subscribe(user => this.user = user != null ? JSON.parse(user) : undefined)
    // this.cart=this.cartService.getCartItems();
  }
  decrementCart(id: number) { this.cartService.decrementCart(id) }
  incrementCart(id: number) { this.cartService.incrementCart(id) }
  cartRemove(id:number){this.cartService.cartRemove(id)}
  emptyCart(){this.cartService.emptyCart()}
}