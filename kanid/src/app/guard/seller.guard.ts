import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate() {
    if(localStorage.getItem('seller-token')){
      return true
    }
    this.router.navigateByUrl('/account/seller/login')
    return false;
  }
  
}
