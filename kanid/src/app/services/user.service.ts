import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/user/'

  myHeader = {
    headers: new HttpHeaders({
      'Authorization': `${localStorage.getItem('token')}`
    })
  }
  constructor(private _http: HttpClient) { }

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

  addToCart(product: any) {
    return this._http.post(this.url + 'add-to-cart', product, this.myHeader)
  }
  getCart() {
    return this._http.get(this.url + 'get-my-cart', this.myHeader)
  }
}
