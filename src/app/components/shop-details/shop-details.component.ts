import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../interfaces/shop';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent implements OnInit, OnDestroy{

  id!: number;
  shop?:Shop
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private shopsService:ShopsService, 
  ){}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => 
       this.id = params['shopId'/* confrontare sempre il parametro di rotta con app.routes o subroutes pertinenti*/]
    );
    this.shopsService.getShopById(this.id).subscribe(shop=>this.shop=shop)
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  navback():void{
    this.router.navigate(['shops'])
  }
}
