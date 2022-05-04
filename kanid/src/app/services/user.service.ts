import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/user/'


  constructor(private _http: HttpClient) { }

  login(loginData: any) {
    return this._http.post(this.url + 'login', loginData)
  }

  signup(signupData: any) {
    return this._http.post(this.url + 'signup', signupData)
  }

  logout() {
    return this._http.get(this.url + 'logout', {
      headers: new HttpHeaders({
        'Authorization': `${localStorage.getItem('token')}`
      })
    })
  }

  changePass(Data: any) {
    return this._http.post(this.url + 'change-password', Data)
  }

  addToCart(product: any) {
    return this._http.post(this.url + 'add-to-cart', product)
  }
  getCart() {
    return this._http.get(this.url + 'get-my-cart')
  }
}
