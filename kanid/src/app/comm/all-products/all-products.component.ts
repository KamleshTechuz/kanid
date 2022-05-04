import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';

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
  preStatus = true;
  nextStatus = false;
  constructor(private productSer: ProductsService, private userSer: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts() {
    this.productSer.getProduct(this.currentPage).subscribe(result => {
      this.result = result
      this.products = this.result.products
      this.totalProd = this.result.totalProds
    })
  }
  addToCart(prodId: any) {
    this.userSer.addToCart({ prodId }).subscribe((result:any) => {
      console.log(result)
      this.router.navigateByUrl('/account/my-cart')
    })
  }

  nextPage() {


    if (this.currentPage >= (Math.ceil(this.totalProd / 2))) {
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
}
