import { Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private cartItemSignal = signal<CartItem[]>([])
  private cartQuantitySignal=signal<number>(this.getCartQuantity())

  get cartItems() {
    return this.cartItemSignal();
  }
  get cartQuantity(){
    return this.cartQuantitySignal();
  }

  constructor() { }

  addToCart(quantity: number, product: Product) {
    const existingItem = this.cartItemSignal().find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    }
    else {
      this.cartItemSignal.update(cartItems => [...cartItems, { product, quantity: quantity }])
    }
  }
  
  getCartItems(): CartItem[] {
    return this.cartItemSignal()    
  }

  getCartQuantity(){
    return this.cartItemSignal().reduce(
      (acc,item)=>acc+item.quantity,0
    )
  }
}