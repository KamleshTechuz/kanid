import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:3000/api/'

  constructor(private _http: HttpClient) { }

  getProduct(pageInfo?: any) {
    // console.log(pageInfo);

    return this._http.get(this.url + `all-products?page=${pageInfo}`,)
  }
  searchProd(searchData?: any) {
    return this._http.get(this.url + `all-products/search?productName=${searchData}`)

  }



  getColor() {    
    return this._http.get(`http://localhost:3000/api/user/color`)
  }
}


