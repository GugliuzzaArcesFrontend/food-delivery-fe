import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Shop } from '../interfaces/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) { }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app/shops/';
  // private url = 'http://localhost:3000/shops/';

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url);
  }

  getShopsByCity(city: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url + city);
  }

  getShopById(shopId:number):Observable<Shop>{
    return this.http.get<Shop>(this.url+shopId)
  }

  addShop(shop: Shop) {
    return this.http.post<Shop>(this.url, shop)
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
