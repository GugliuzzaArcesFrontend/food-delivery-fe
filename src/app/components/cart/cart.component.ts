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
  imports: [NgFor,CurrencyPipe,FormsModule],
  template: `
    <p>
      cart works!
    </p>
    @for (product of cart; track $index) {
      <button type="button" (click)="decrementCart(product.product.id)">Cala</button>
      <p>{{product.product.name}} in numero: <input type="number" [(ngModel)]="product.quantity"></p>
      <button type="button" (click)="incrementCart(product.product.id)">Aumenta</button>
      <br>
    }
    @if(cart!=null||undefined){
      Prezzo merci:{{cartPrice|currency:'EUR'}}
    }
    Prezzo spedizione:{{deliveryPrice|currency:'EUR'}}
    Totale:{{finalPrice|currency:'EUR'}}
  `,
  styles: ``
})

export class CartComponent implements OnInit {
  // user!: User
  cart!:CartItem[];
  cartPrice!:number;
  deliveryPrice:number=0;
  finalPrice!:number;
  constructor(private authService: AuthService, private productsService: ProductsService, private cartService:CartService){
    effect(()=>{
      this.cartPrice=cartService.cartTotal();
      this.cart=cartService.cartItems
      this.deliveryPrice=cartService.cartItems.reduce((acc,item)=>acc+item.quantity*1.5,1)
      this.finalPrice=cartService.cartTotal()+this.deliveryPrice      
      }
    )
  };
  ngOnInit(): void {
    // this.authService.authedUser$.subscribe(user => this.user = user != null ? JSON.parse(user) : undefined)
    // this.cart=this.cartService.getCartItems();
  }
  decrementCart(id:number){this.cartService.decrementCart(id)}
  incrementCart(id:number){this.cartService.incrementCart(id)}
}