import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Shop } from '../../interfaces/shop';
import { ShopComponent } from '../shop/shop.component';
import { ShopsService } from '../../services/shops.service';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ShopComponent],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
})
export class ShopsComponent implements OnInit {

  shops: Shop[] = [];
  filteredShops: Shop[] = [];
  filtro: string = '';

  constructor(private shopsService: ShopsService) {}

  ngOnInit() {
    // Carica i prodotti all'inizializzazione
    this.shopsService.getShops().subscribe((data) => {
      this.shops = data;
      this.filteredShops = data;
    });

    this.shopsService.search$.subscribe(term => {
      this.filteredShops = this.shops.filter(shop => 
        shop.denominazione.toLowerCase().includes(term.toLowerCase())
      );
    });
  }


handleEvent(event: string) {
  console.log(event);
}
}