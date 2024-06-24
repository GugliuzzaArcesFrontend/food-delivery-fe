import { Routes } from "@angular/router";
import { ShopsComponent } from "../components/shops/shops.component";
import { ProductComponent } from "../components/product/product.component";

export const shopRoutes:Routes=[
    {path:'', component:ShopsComponent},
    {
        path:':shopId',
        loadComponent:()=>import('../components/shop-details/shop-details.component').then(m=>m.ShopDetailsComponent),
        loadChildren:()=>import('../routes/products.routes').then(m=>m.productRoutes)
    }
]