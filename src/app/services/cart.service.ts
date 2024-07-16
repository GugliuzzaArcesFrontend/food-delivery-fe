import { computed, Injectable, signal } from '@angular/core';
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

  cartCount=computed(()=>{
    return this.cartItemSignal().reduce((acc,item)=>acc+item.quantity,0)
  })

  cartTotal=computed(()=>{
    return this.cartItemSignal().reduce((acc,item)=>acc+item.quantity*item.product.price,0)
  })

  constructor() { }

  addToCart(quantity: number, product: Product) {
    const existingItem = this.cartItemSignal().find(item => item.product.id === product.id);
    if (existingItem) {
      // existingItem.quantity += quantity;
      this.cartItemSignal.update(cartItems=>cartItems.map(
        item=>item.product.id===product.id
        ?{...item, quantity:item.quantity+quantity}
        :item))
    }
    else {
      this.cartItemSignal.update(cartItems => [...cartItems, { product, quantity: quantity }])
    }
  }
  
  incrementCart(id:number):void{
    this.cartItemSignal.update(cartItems=>
      cartItems.map(
        item=>item.product.id===id?{...item,quantity:item.quantity+1}:item
      )
    )
  };

  decrementCart(id:number):void{
    this.cartItemSignal.update(cartItems=>
      cartItems.map(
        item=>{if(item.quantity>0){return item.product.id===id?{...item,quantity:item.quantity-1}:item}else{return item}}
      )
    )
  };

  removeFromCart():void{    
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