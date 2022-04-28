import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  url = 'http://localhost:3000/api/seller/'
  constructor(private _http: HttpClient) { }

  myHeader = {
    headers: new HttpHeaders({
      'Authorization': `${localStorage.getItem('seller-token')}`
    })
  }

  login(loginData: any) {
    return this._http.post(this.url + 'login', loginData)
  }

  signup(signupData: any) {
    return this._http.post(this.url + 'signup', signupData)
  }
  logout() {
    return this._http.get(this.url + 'logout', this.myHeader)
  }
  changePass(Data: any) {
    return this._http.post(this.url + 'change-password', Data, this.myHeader)
  }
  getProdById(prodId: any) {
    return this._http.get(this.url + `my-product/${prodId}`, this.myHeader)
  }

  myProducts(pageInfo?: any) {
    return this._http.get(this.url + `my-products?page=${pageInfo}`, this.myHeader)
  }

  addProduct(loginData: any) {
    return this._http.post(this.url + 'add-product', loginData,
      this.myHeader)
  }
  ondelete(prodId: any) {
    return this._http.post(this.url + `my-product/:${prodId}/delete`, { prodId }, this.myHeader)
  }
  onupdate(prodId: any, productData: any) {
    return this._http.post(this.url + `my-product/${prodId}/update`, productData, this.myHeader)
  }
}
