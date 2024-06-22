import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app/';
  // private url = 'http://localhost:3000/';

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'products/');
  }

  getProductsByShopId(shopId:number):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'productsByShop/'+shopId);
  }

  getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>(this.url+'product/'+productId)
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
