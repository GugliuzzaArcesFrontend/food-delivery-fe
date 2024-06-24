import { Routes } from "@angular/router";

export const productRoutes:Routes=[
    {path:'', loadComponent:()=>import('../components/products/products.component').then(m=>m.ProductsComponent)},
    {path:':productId',loadComponent:()=>import('../components/product-details/product-details.component').then(m=>m.ProductDetailsComponent)}
]