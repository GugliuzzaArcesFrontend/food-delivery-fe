import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shop } from '../interfaces/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpClient) { }

  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  private url = 'https://gugliuzzadeployservernode-gruppostudioarces-projects.vercel.app';
  // private url = 'http://localhost:3000';

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url + "/shops");
  }

  getShopsByCity(city: string): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.url + "/shops/" + city);
  }

  addShop(shop: Shop) {
    return this.http.post<Shop>(this.url + "/shops", shop)
  }

  updateSearchTerm(term: string) {
    this.searchSubject.next(term);
  }
}
