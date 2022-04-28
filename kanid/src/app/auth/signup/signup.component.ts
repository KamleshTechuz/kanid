import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  form: any;
  result: any
  error: any
  message: any
  constructor(private fb: FormBuilder, private route: Router,
    private userSer: UserService
  ) {
  }



  ngOnInit(): void {
    this.generateForm()
  }

  generateForm() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      fullAddress: this.fb.group({
        place: ['', [Validators.required, Validators.minLength(6)]],
        city: ['', [Validators.required, Validators.minLength(6)]],
        state: ['', [Validators.required, Validators.minLength(6)]],
        pinCode: ['', [Validators.required, Validators.minLength(6)]]
      })
    })
  }
  onSubmit(formData: any) {
    console.log(formData)
    this.userSer.signup(formData).subscribe(result => {
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
        this.route.navigateByUrl('/account/login')


      }

    }, (error) => {
      console.log(error);

    })

  }


}
