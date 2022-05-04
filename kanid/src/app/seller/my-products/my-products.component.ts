import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  result: any
  error: any
  message: any
  products: any
  prodLength: any
  currentPage = 1
  totalProd: any
  preStatus = true;
  nextStatus = false;
  constructor(private sellerSer: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()

  }
  getProducts() {
console.log('this.currentPage : ',this.currentPage);

    this.sellerSer.myProducts(this.currentPage).subscribe(result => {

      this.result = result
      this.error = this.result.error


      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: this.error,
          showConfirmButton: false,
          timer: 1500
        })

      }
      else {

        this.products = this.result.products
        this.totalProd = this.result.totalProds
        console.log(this.totalProd);
        
      }
    })
  }





  nextPage() {


    if (this.currentPage >= (Math.ceil(this.totalProd / 2))) {
      console.log(Math.ceil(this.totalProd / 2));
      
      this.nextStatus = true


    } else {
      this.preStatus = false
      this.currentPage += 1
    }
    this.getProducts()
  }

  prePage() {

    if (this.currentPage <= 1) {
      // this.currentPage = 1
      this.preStatus = true
      this.nextStatus = false

    } else {
      this.currentPage -= 1

    }
    this.getProducts()

  }







  update(prodId: any) {
    this.router.navigateByUrl(`/seller/my-products/${prodId}`)
  }

  delete(prodId: any) {
    console.log(prodId)
    this.sellerSer.ondelete(prodId).subscribe(result => {
      console.log(result);
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
      }
      window.location.reload()


    })
  }

}
