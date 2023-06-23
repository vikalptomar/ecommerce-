import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message = "";
  isButtonDisabled: boolean = false;

  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private users: AdminService, private router: Router) { }

  login() {
    this.isButtonDisabled=true;
    this.users.userLogin().subscribe((res: any) => {
      let data = res.users;
      let filter = data.filter((val: any) => {
        if ((val.email === this.loginform.value.email) && (val.password === this.loginform.value.password)) {
          const token = val;
          // localStorage.setItem('sessionToken', JSON.stringify(token));
          
          // To encrypt the local storage key using the CryptoJS library
          const secretKey = 'my-secret-key';
          const tokenKey = CryptoJS.AES.encrypt(JSON.stringify(token), secretKey).toString();
          localStorage.setItem('sessionToken' , tokenKey)
          
          this.router.navigate(['products']);
        }
        else {
          this.message = "Invalid email id or password";
          this.isButtonDisabled=false;
        }
      });
    })
    // let length = data.length;
    // let i;
    // for (i = 0; i < length; i++) {
    //   if (data[i].email === this.loginform.value.email && data[i].password === this.loginform.value.password) {
    //     this.router.navigate(['products'])
    //   }
    //   else {
    //     this.message = "Invalid email id or password"
    //   }
    // }
  }
}