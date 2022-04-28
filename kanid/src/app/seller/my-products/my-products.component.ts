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
  constructor(private sellerSer: SellerService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('seller-token')) {

      this.getProducts()
    }

  }
  getProducts() {

    this.sellerSer.myProducts(1).subscribe(result => {

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
        this.prodLength = this.result.products.length
      }
    })
  }




  nextPage() {
    console.log(Math.ceil(this.totalProd / 2));

    if (this.currentPage >= (Math.ceil(this.totalProd / 2))) {
      console.log(this.totalProd);

      this.currentPage = Math.ceil(this.totalProd / 2)
    } else {
      console.log(this.totalProd);
      console.log(this.currentPage);

      this.currentPage += 1

    }
    this.sellerSer.myProducts(this.currentPage).subscribe(result => {
      this.result = result
      this.products = this.result.products
      this.prodLength = this.result.products.length
      console.log(this.products);

    })
  }

  prePage() {

    if (this.currentPage <= 1) {
      this.currentPage = 1
    } else {
      this.currentPage -= 1

    }
    console.log(this.currentPage);

    this.sellerSer.myProducts(this.currentPage).subscribe(result => {
      this.result = result
      this.products = this.result.products
      this.prodLength = this.result.products.length
      console.log(this.products);

    })
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
