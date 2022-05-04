import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommRoutingModule, comRouting } from './comm-routing.module';


@NgModule({
  declarations: [comRouting],
  imports: [
    CommonModule,
    CommRoutingModule
  ]
})
export class CommModule { }
