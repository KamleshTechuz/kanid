import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  result: any
  error: any
  message: any
  constructor(public homeSer: HomeService, private fb: FormBuilder, private router: Router,
    private userSer: UserService, private sellerSer: SellerService) {
  }
  form = this.fb.group({
    search: []
  })

  ngOnInit(): void {
  }

  search(searchData: any) {
    // console.log(searchData);
    if (searchData.search) {

      this.router.navigateByUrl(`/all-products/search?productName=${searchData.search}`)
    }
    // window.location.reload()

  }
  logout() {
    this.userSer.logout().subscribe(result => {
      this.result = result
      this.error = this.result.error
      this.message = this.result.message
      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: this.error,
          showConfirmButton: false,
          timer: 1500
        })

      }
      if (this.message) {
        Swal.fire({
          icon: 'success',
          title: this.message,
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.clear()

      }
    })

  }
  sellerLogout() {
    
    this.sellerSer.logout().subscribe(result => {
      
      this.result = result
      this.error = this.result.error
      this.message = this.result.message
      
      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: this.error,
          showConfirmButton: false,
          timer: 1500
        })

      }
      if (this.message) {
        Swal.fire({
          icon: 'success',
          title: this.message,
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.clear()
        this.router.navigateByUrl('/seller/login')

      }
    })

  }
}
