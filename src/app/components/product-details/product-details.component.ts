import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id!: number
  product?: Product
  private sub!: any
  
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location:Location
  ) { }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => this.id = params['productId']);
    this.productsService.getProductById(this.id).subscribe((product: Product) => this.product = product)
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  navback() {
    this.location.back()
  }
}
