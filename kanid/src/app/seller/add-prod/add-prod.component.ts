import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {


  form: any
  file: any
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
      image: ['', Validators.required],
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

  onSelectFile(event: any) {
    console.log(event.target.files);
    this.file = event.target.files[0]

  }

  jsonToFormData(formData: any) {
    const newFormData = new FormData()
    for (var key in formData) {
      
      newFormData.append(key, formData[key]);
    }
    newFormData.append('image', this.file)
    return newFormData
  }
  onSubmit(formData: any, event: any) {

    const myFormData = this.jsonToFormData(formData)

console.log(formData);

    this.sellerSer.addProduct(myFormData).subscribe(result => {
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
