import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
import * as CryptoJS from 'crypto-js';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  list: any = {};
  homeicon=faHome;
  arr: any = [];
  isLoading=true;

  updateForm=new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    university: new FormControl(''),
    address: new FormControl('')
    
  })

  constructor(private userDetail: AdminService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    console.log("hi");
    // console.log(localStorage.getItem('sessionToken'));
    let list: any = localStorage.getItem('sessionToken');
     const decryptKey = CryptoJS.AES.decrypt(list,'my-secret-key')
     const originalText = decryptKey.toString(CryptoJS.enc.Utf8);
     this.arr=JSON.parse(originalText);
     this.isLoading=false
     console.log(this.arr)
    //  this.updateForm.setValue({
    //   username:'ram'

    // })

    this.updateForm.setValue({
      username:this.arr.username,
      email:this.arr.email,
      phone:this.arr.phone,
      gender:'',
      university:this.arr.university,
      address:this.arr.address.address +' '+this.arr.address.state+' '+this.arr.address.city+' '+this.arr.address.coordinates.lat+' '+this.arr.address.coordinates.lng 
      
     })

    // console.log(typeof this.list);
  }

  update(){
    console.log("updated");    
  }

  // data = this.userDetail.getUserById(this.route.snapshot.params['id']).subscribe((res) => {
  //   console.log(res);
  //   this.x = res;
  // })
}
