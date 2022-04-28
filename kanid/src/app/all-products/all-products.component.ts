import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  currentPage = 1
  result: any
  products: any
  totalProd: any

  constructor(private productSer: ProductsService, private userSer: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.productSer.getProduct(this.currentPage).subscribe(result => {
      this.result = result
      this.products = this.result.products
      this.totalProd = this.result.totalProds
      console.log(this.totalProd);
    })
  }
  addToCart(prodId: any) {
    this.userSer.addToCart({ prodId }).subscribe(result => {
      console.log(result)
      this.router.navigateByUrl('/account/my-cart')
    })
  }

  nextPage() {
    console.log(Math.ceil(this.totalProd / 2));

    if (this.currentPage >= (Math.ceil(this.totalProd / 2))) {
      this.currentPage = Math.ceil(this.totalProd / 2)
    } else {
      this.currentPage += 1
    }
    this.getProducts()
  }

  prePage() {

    if (this.currentPage <= 1) {
      this.currentPage = 1
    } else {
      this.currentPage -= 1

    }
    this.getProducts()

  }
}
