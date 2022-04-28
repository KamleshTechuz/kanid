import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  form: any
  result: any
  error: any
  message: any
  constructor(private fb: FormBuilder, private route: Router,
    private userSer: SellerService
  ) {
  }


  ngOnInit(): void {
    this.generateForm()
  }

  generateForm() {

    this.form = this.fb.group({
      oldPass: ['', [Validators.required, Validators.minLength(6)]],
      newPass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],

    })
  }
  onSubmit(formData: any) {
    this.userSer.changePass(formData).subscribe(result => {
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


    })

  }

}
