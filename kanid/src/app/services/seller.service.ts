import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  url = 'http://localhost:3000/api/seller/'
  constructor(private _http: HttpClient) { }


  login(loginData: any) {
    return this._http.post(this.url + 'login', loginData)
  }

  signup(signupData: any) {
    return this._http.post(this.url + 'signup', signupData)
  }
  logout() {
    return this._http.get(this.url + 'logout')
  }
  changePass(Data: any) {
    return this._http.post(this.url + 'change-password', Data)
  }
  getProdById(prodId: any) {
    return this._http.get(this.url + `my-product/${prodId}`)
  }

  myProducts(pageInfo?: any) {
    return this._http.get(this.url + `my-products?page=${pageInfo}`)
  }

  addProduct(loginData: any) {
    return this._http.post(this.url + 'add-product', loginData)
  }
  ondelete(prodId: any) {
    return this._http.post(this.url + `my-product/:${prodId}/delete`, { prodId })
  }
  onupdate(prodId: any, productData: any) {
    return this._http.post(this.url + `my-product/${prodId}/update`, productData)
  }
}
