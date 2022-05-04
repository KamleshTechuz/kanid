import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from '../guard/is-logged.guard';
import { SellerGuard } from '../guard/seller.guard';
import { AddProdComponent } from './add-prod/add-prod.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerComponent } from './seller/seller.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {
    path: '', component: SellerComponent, canActivate: [SellerGuard], children: [
        { path: 'add-product', component: AddProdComponent },
        { path: 'my-products', component: MyProductsComponent },
        { path: 'my-profile', component: MyProfileComponent },
        { path: 'my-products/:id', component: UpdateProductComponent }
    ]
},
{ path: 'login', component: SellerLoginComponent, canActivate: [IsLoggedGuard] },
{ path: 'signup', component: SellerSignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
export const sellerRouting = [
  SellerComponent,
  AddProdComponent,
  MyProductsComponent,
  MyProfileComponent,
  UpdateProductComponent,
  SellerLoginComponent,
  SellerSignupComponent

]