import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { adminLoggedGuard, authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  {
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [adminLoggedGuard, authGuard]
  },
  {
    path: 'shops', loadChildren: () => import('./routes/shop.routes').then(m => m.shopRoutes)
  },
  {
    path: 'products',
    loadChildren: () => import('./routes/products.routes').then(m => m.productRoutes)
    , /* children: [
      { path: '', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent) },
      { path: ':productId', loadComponent:()=>import('./components/product-details/product-details.component').then(m=>m.ProductDetailsComponent)}
    ] */
  },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];