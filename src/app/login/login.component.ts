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
    this.users.userLogin().subscribe((data: any) => {
     debugger;
      let user = data.filter((val:any)=> val.email === this.loginform.value.email);
      debugger;
      
     

      let i;
      let length=data.length;  

      for (i = 0; i < length; i++) {
        debugger;
        if (data[i].email === this.loginform.value.email && data[i].password === this.loginform.value.password) {
         
         
          this.router.navigate(['products'])
        }
        else {
          this.message = "Invalid email id or password"
        }
      }
    })

}
}
