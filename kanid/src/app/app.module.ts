import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgxDropzoneModule } from 'ngx-dropzone';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './headFoot/header/header.component';
import { FooterComponent } from './headFoot/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterInterceptor } from './services/http-inter.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
