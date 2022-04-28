import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {


  form: any
  public data: any;
  error: any
  message: any
  result: any
  colors: any
  colorRes: any
  selectedFile: any
  constructor(private fb: FormBuilder, private route: Router,
    private sellerSer: SellerService, private prodSer: ProductsService
  ) {
  }


  ngOnInit(): void {
    this.getColor()
    this.generateForm()
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
  getColor() {
    this.prodSer.getColor().subscribe(result => {
      this.colorRes = result
      this.error = this.colorRes.error
      this.message = this.colorRes.message
      this.colors = this.colorRes.colors
      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: this.error,
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl('/account/seller/login')
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

  onFileSelect(e: any) {
    const file = (e.target as HTMLInputElement).files
    console.log(file);

    this.form.patchValue({
      image: file
    })
    this.form.get('image')?.updateValueAndValidity()

  }

  onSubmit(formData: any, event: any) {

    console.log(formData);


    this.sellerSer.addProduct(formData).subscribe(result => {
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
        this.route.navigateByUrl('/seller/my-products')
      }

    })
  }

}
