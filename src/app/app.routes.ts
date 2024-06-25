import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProductsComponent } from './components/products/products.component';
import { UserComponent } from './components/user/user.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Agrega esta línea
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }, 
  children: [
    { path: 'products', component: ProductsComponent },
    { path: 'users', component: UserComponent }
  ] 
},
{ path: '**', redirectTo: '' }
];