import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form:any
  public data: any;
  error: any
  message: any
  result: any
  constructor(private fb: FormBuilder, private route: Router, private userSer: UserService) { }

  ngOnInit(): void {
    this.generateForm()
  }

  // form generate
  generateForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

// Submit process
  onSubmit(formData: any) {

    this.userSer.login(formData).subscribe(result => {
      this.result = result
      this.error = this.result.error
      this.message = this.result.message
      
      // Alert modals 
      if (this.error) {
        Swal.fire({
          icon: 'warning',
          title: 'Invalid credential.',
          showConfirmButton: false,
          timer: 1500
        })

      }
      if (this.result.status) {
        localStorage.setItem('token', this.result.user.token)
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully.',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigateByUrl('')
      }

    }, (error) => {
      console.log(error);

    })
  }


}
