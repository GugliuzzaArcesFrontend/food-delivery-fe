import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { ProductComponent } from '../product/product.component';
import { ActivatedRoute } from '@angular/router';
// import items from '../data/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  sub!: any;
  shopId!: number;
  products!: Product[];
  filteredProducts!: Product[];
  filter: string = '';

  constructor(private productService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // sottoscrive
    this.sub = this.route.params.subscribe(params => {
      this.shopId = +params['shopId'];
      // In a real app: dispatch action to load the details here.
    });
    if (!this.shopId) {
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.products = products;
        this.filteredProducts = products;
      });      
    }
    else {
      this.productService.getProductsByShopId(this.shopId).subscribe((products:Product[])=>{
        this.products=products
        this.filteredProducts=products
      }
    )
    }
    this.productService.search$.subscribe(term => {
      this.filteredProducts = this.products?.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  handleEvent(event: string) {
    console.log(event);
  }
}