import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  @Input() product!: Product;
  quantity:number=0;
  productId!:number
  @Output() myEvent = new EventEmitter<string>;
  constructor(private productsService:ProductsService){}

  addToCart(quantityFn:number,productId:number):void{
    if(quantityFn<=this.product.availability){this.productsService.addToCart(quantityFn,productId);}
    else
    {console.log('ne stai ordinando più di quanti ne hanno');}    
    this.quantity=0;
  };

  decrease():void{
    if(this.quantity>0)this.quantity-=1
  };

  increase():void{
    this.quantity+=1
  };
  
  emitEvent() {
    this.myEvent.emit(this.product.name);
  };
}
