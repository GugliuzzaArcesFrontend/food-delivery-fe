import{Injectable,signal}from'@angular/core';
import{CartItem,Product}from'../interfaces/product';

@Injectable({
  providedIn:'root'
})

export class CartService{

  private cartItemsSignal=signal<CartItem[]>([]);

  get CartItems(){
    return this.cartItemsSignal()
  }
  
  constructor(){}

  addToCart(quantity:number,product:Product){
    const existingItem=this.cartItemsSignal().find(item=>item.product.id===product.id);
    if(existingItem){
      // existingItem.quantity += quantity;
      this.cartItemsSignal.update(cartItems=>cartItems.map(
        item=>
          item.product.id===product.id
          ?{...item,quantity:item.quantity+quantity}
          :item))
    }else{
      this.cartItemsSignal.update(cartItems=>[...cartItems,{product,quantity:quantity}])
    };
  };

  incrementCart(id:number):void{
    this.cartItemsSignal.update(cartItems=>cartItems.map(item=>
        item.product.id===id
        ?{...item,quantity:item.quantity+1}
        :item
  ))};

  decrementCart(id:number):void{
    this.cartItemsSignal.update(cartItems=>cartItems.map(item=>{
      if(item.quantity>0){
        return item.product.id===id
          ?{...item,quantity:item.quantity-1}
          :item
      }else{
        return item
      }
    }));
  };

  /* cartRemove(id:number):void{
    const index=this.cartItemsSignal().findIndex((item:any)=>item.product.id===id);
    this.cartItemsSignal().splice(index,1);
    this.cartItemsSignal.update(cartItems=>[...cartItems]);
  } */

  cartRemove(id:number):void{this.cartItemsSignal.update(cartItems => cartItems.filter(item => item.product.id != id))};

  emptyCart():void{this.cartItemsSignal.update(()=>[])};
}