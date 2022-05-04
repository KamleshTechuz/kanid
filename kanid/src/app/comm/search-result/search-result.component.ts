import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  productName: any
  result: any
  queryRes : any
  products :any
  length:any
  constructor(private actRoute: ActivatedRoute, private prodSer: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(result => {
      console.log('hello');
      
      this.result = result
      this.productName = this.result.productName
      console.log(this.productName);
      
      this.getResult(this.productName)

    })
    // this.router.events.subscribe((event) => {
    //   console.log('event : ', event);
    //   this.getResult(this.productName)

    // });
  }

  getResult(productName: any) {
    this.prodSer.searchProd(productName).subscribe((result:any) => {
      console.log(result);
      this.queryRes = result
      this.products = this.queryRes.products
      console.log(this.products);
      this.length =  this.products.length
      

    })
  }

}
