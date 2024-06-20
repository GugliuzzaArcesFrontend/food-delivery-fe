import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ShopsComponent } from './components/shops/shops.component';
import { LoginComponent } from './components/login/login.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { adminLoggedGuard, authGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminLoggedGuard, authGuard] },
  { path: 'shops', component: ShopsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  {
    path: 'shop-details/:id', component: ShopDetailsComponent,
    children: [
      { path: 'products', component: ProductsComponent }
    ]
  },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];
