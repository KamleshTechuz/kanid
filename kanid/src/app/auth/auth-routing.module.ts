import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedGuard } from '../guard/is-logged.guard';
import { UserGuard } from '../guard/user.guard';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PasswordComponent } from './password/password.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsLoggedGuard] },
  { path: 'signup', component: SignupComponent, },
  { path: 'user/change-password', component: PasswordComponent, },
  { path: 'my-cart', component: CartComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
export const userRouting = [
  LoginComponent,
  SignupComponent,
  PasswordComponent,
  CartComponent
]