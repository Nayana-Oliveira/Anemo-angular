import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home';
import { LoginUser } from './pages/login-user/login-user';
import { LoginAdmin } from './pages/login-admin/login-admin';
import { RegisterUserComponent } from './pages/register-user/register-user';
import { RegisterAdmin } from './pages/register-admin/register-admin';
import { ProductDetail } from './pages/product-detail/product-detail';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ProductRegistration } from './pages/product-registration/product-registration';
import { EditProduct } from './pages/edit-product/edit-product';
import { Cart } from './pages/cart/cart';
import { Category } from './pages/category/category';
import { SearchResults } from './pages/search-results/search-results';
import { Erro } from './pages/erro/erro';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'login-user', component: LoginUser },
  { path: 'login-admin', component: LoginAdmin },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-admin', component: RegisterAdmin },
  
  { path: 'product/:id', component: ProductDetail }, 
  
  { path: 'user-dashboard', component: UserDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'product-registration', component: ProductRegistration },
  { path: 'edit-product', component: EditProduct },
  { path: 'cart', component: Cart },

  { path: 'category/:id', component: Category },

  { path: 'search', component: SearchResults },
  { path: 'error', component: Erro },
  
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' } 
];