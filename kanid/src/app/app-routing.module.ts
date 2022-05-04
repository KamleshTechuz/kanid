import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'account', loadChildren: ()=> import('./auth/auth.module').then(mod=>mod.AuthModule)},
  { path: 'seller', loadChildren: ()=> import('./seller/seller.module').then(mod=>mod.SellerModule)},
  { path: '', loadChildren: ()=> import('./comm/comm.module').then(mod=>mod.CommModule)},
  { path: 'page-not-found', component: PageNotFoundComponent },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
