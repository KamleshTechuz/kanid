import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories = [
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100",
      title: "Top offers"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100",
      title: "Grocery"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
      title: "Mobile"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/c12afc017e6f24cb.png?q=100",
      title: "Fashion"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
      title: "Electronics"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
      title: "Home"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100",
      title: "Appliances"
    },
    {
      image: "https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
      title: "Beauty & toys"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
