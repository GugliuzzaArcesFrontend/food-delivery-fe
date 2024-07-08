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
  cart:any[]=[]
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();
  authedUser?:User|null
  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app/';
  // private url = 'http://localhost:3000/';
  
  constructor(private http: HttpClient, private authService:AuthService) {
    this.authService.authedUser$.subscribe(user=> this.authedUser=user)
  }

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

    let body={"userId":this.authedUser?.id,"quantity":quantity,"productId":product}
    if(body.quantity==0)console.log("Vuoi davvero ordinare 0 prodotti?");
    if(this.authedUser!=undefined){
      this.http.post(this.url+'/addToCart',body).subscribe({
        next:(response:any)=>{
          console.log(body);
          console.log('Chiamata effettuata');
          
        },
        error:(error:any)=>{
          console.log('Errore dal server');
          console.log(body);
          console.error(error)    
        }  
      })
    }
    else {
      this.cart.push({"quantity":quantity,"productId":product});
      console.log(this.cart);
      

    };    
  };

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
