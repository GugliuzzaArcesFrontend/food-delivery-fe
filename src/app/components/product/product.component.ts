import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  @Input() product!: Product;
  quantity:number=0;
  productId!:number
  @Output() myEvent = new EventEmitter<string>;
  constructor(private productsService:ProductsService, private cartService:CartService){}

  addToCart(quantity:number,product:Product):void{
    if(quantity===0)console.log('finiscila i cugghiuniari');
    if(quantity>this.product.availability)console.log('ne stai ordinando più di quanti ne hanno');    
    if(quantity<=this.product.availability&&quantity!=0){this.cartService.addToCart(quantity,product);this.quantity=0;}
  };

  decrease():void{
    if(this.quantity>0)this.quantity-=1
  };

  increase():void{
    if(this.quantity<this.product.availability)this.quantity+=1
  };
  
  emitEvent() {
    this.myEvent.emit(this.product.name);
  };
}