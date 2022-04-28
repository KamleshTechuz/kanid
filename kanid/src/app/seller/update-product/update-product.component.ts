import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  form: any
  prodId: any
  product: any;
  error: any
  message: any
  result: any
  colors: any
  constructor(private fb: FormBuilder, private route: Router,
    private sellerSer: SellerService,
    private prodSer: ProductsService,
    private actRoute: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.generateForm()
    this.getColor()
    this.getProductData()


  }
  generateForm() {
    this.form = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(6)]],
      brandName: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      colors: ['', Validators.required]
    })

  }
  getProductData() {
    this.prodId = this.actRoute.snapshot.paramMap.get('id')

    this.sellerSer.getProdById(this.prodId).subscribe(result => {
      this.result = result
      this.error = this.result.error
      this.message = this.result.message
      this.product = this.result.product
      this.form.patchValue(this.product);

    })
  }
  getColor() {
    this.prodSer.getColor().subscribe(result => {
      this.result = result
      this.colors = this.result.colors
    })
  }
  onUpdate(formData: any) {
    this.sellerSer.onupdate(this.prodId, formData).subscribe(result => {
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

        this.route.navigateByUrl('/seller/my-products')
      }

    })
  }

}
