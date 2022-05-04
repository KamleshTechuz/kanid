import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate() {
    const userToken = localStorage.getItem('token')
    const sellerToken = localStorage.getItem('seller-token')
    if (userToken || sellerToken) {
      this.router.navigateByUrl('/page-not-found')
      return false;
    }
    return true
  }

}
