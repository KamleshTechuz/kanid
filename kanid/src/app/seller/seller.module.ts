import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sellerRouting, SellerRoutingModule } from './seller-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [sellerRouting],
  imports: [
    CommonModule,
    SellerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SellerModule { }
