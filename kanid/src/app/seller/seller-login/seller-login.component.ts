import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  form: any
  error: any
  message: any
  result: any
  constructor(private fb: FormBuilder, private route: Router, private userSer: SellerService) { }

  ngOnInit(): void {
    this.generateForm()
  }
  generateForm() {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }



  onSubmit(formData: any) {
    this.userSer.login(formData).subscribe(result => {
      this.result = result
      this.error = this.result.error
      this.message = this.result.message
      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid credential.',
          showConfirmButton: false,
          timer: 1500
        })

      }
      if (this.result.status) {
        localStorage.setItem('seller-token', this.result.token)
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully.',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl('/seller/my-products')
        const getted = localStorage.getItem('seller-token')
        if (getted) {
        }
      }

    }, (error) => {
      console.log(error);

    })
  }


}
