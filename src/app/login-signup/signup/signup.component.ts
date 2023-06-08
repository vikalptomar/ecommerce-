import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {Router} from '@angular/router';
import { signUp } from '../../data-type';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private users: AdminService,private router:Router) { }

  ngOnInit(): void { }
  
  signUp(data: signUp) {
    console.log(data);
    this.users.userSignUp(data).subscribe((res: any) => {
      console.log(res);
      if(res){
        this.router.navigate(['products']);
      }
    })
  }
}
