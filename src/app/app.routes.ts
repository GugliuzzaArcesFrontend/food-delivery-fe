import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopsComponent } from './components/shops/shops.component';
import { LoginComponent } from './components/login/login.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { UsersComponent } from './components/users/users.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { adminLoggedGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminLoggedGuard, authGuard] },
  {
    path: 'shops', children: [
      { path: '', component: ShopsComponent },
      {
        path: ':shopId', component: ShopDetailsComponent, children: [
          { path: '', component: ProductsComponent },
          { path: ':productId', component: ProductDetailsComponent }
        ]
      },
    ]
  },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: ':productId', component: ProductDetailsComponent }
    ]
  },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
