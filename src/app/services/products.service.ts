import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from '../interfaces/product';
import { AuthService } from './auth.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private authService:AuthService) { }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();
  authedUser:User=this.authService.authedUser$.subscribe(user=> return user)
  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app/';
  // private url = 'http://localhost:3000/';

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'products/');
  };

  getProductsByShopId(shopId:number):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'productsByShop/'+shopId);
  };

  getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>(this.url+'product/'+productId)
  };

  addToCart(quantity:number,product:number){
    this.http.post(this.url+'/addToCart',({"userID":this.authedUser.id,"quantity":quantity,"productId":product}))
  };
  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
