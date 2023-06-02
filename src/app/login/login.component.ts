import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private users: AdminService, private router: Router) { }

  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  message = "";

  login() {
    this.users.userLogin().subscribe((res: any) => {
      let data = res.users;
      let filter = data.filter((val: any) => {
        if ((val.email === this.loginform.value.email) && (val.password === this.loginform.value.password)) {

          const token = val;

          localStorage.setItem('sessionToken', JSON.stringify(token));
          console.log(token);

          this.router.navigate(['products']);
        }
        else {
          this.message = "Invalid email id or password";
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
