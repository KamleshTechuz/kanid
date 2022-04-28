import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  get isLogged(){
    if(localStorage.getItem('token')){
      return true
    }
    return false
  }

  get isSeller(){
    if(localStorage.getItem('seller-token')){
      return true
    }
    return false
  }
}
