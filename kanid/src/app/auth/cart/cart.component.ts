import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
result:any
cart:any
  constructor(private cartSer : UserService) { }

  ngOnInit(): void {
    this.cartSer.getCart().subscribe((result:any)=>{
      // console.log(result);
      this.result = result
      this.cart = this.result.myCart      
    })
  }

}
