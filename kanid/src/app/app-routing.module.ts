import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SellerComponent } from './seller/seller/seller.component';
import { SellerLoginComponent } from './seller/seller-login/seller-login.component';
import { AddProdComponent } from './seller/add-prod/add-prod.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { MyProductsComponent } from './seller/my-products/my-products.component';
import { MyProfileComponent } from './seller/my-profile/my-profile.component';
import { SearchResultComponent } from './search-result/search-result.component';


import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { SellerSignupComponent } from './seller/seller-signup/seller-signup.component';
import { CartComponent } from './cart/cart.component';
import { SellerGuard } from './guard/seller.guard';
import { UserGuard } from './guard/user.guard';
import { PasswordComponent } from './auth/password/password.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'all-products', component: AllProductsComponent},
  {path:'all-products/search', component: SearchResultComponent},
  {path:'account/login', component: LoginComponent},
  {path:'account/signup', component: SignupComponent, },
  {path:'account/user/change-password', component: PasswordComponent, },
  {path:'account/my-cart', component: CartComponent, canActivate : [UserGuard] },
  {path:'seller', component: SellerComponent, canActivate : [SellerGuard] ,children : [
    {path:'add-product', component: AddProdComponent},
    {path:'my-products', component: MyProductsComponent},
    {path:'my-profile', component: MyProfileComponent},
    {path:'my-products/:id', component: UpdateProductComponent}
  ]},
  {path:'account/seller/login', component: SellerLoginComponent},
  {path:'account/seller/signup', component: SellerSignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = [HomeComponent, LoginComponent, SignupComponent,
   SellerComponent,SellerLoginComponent, AddProdComponent, AllProductsComponent,
   SellerSignupComponent,
   CartComponent,
   MyProductsComponent,
   UpdateProductComponent,
   MyProfileComponent,
   PasswordComponent,
   SearchResultComponent
  
  ]