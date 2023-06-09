import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons'; 
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  list: any = {};
  homeicon=faHome;
  arr: any = [];
  constructor(private userDetail: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("hi");
    // console.log(localStorage.getItem('sessionToken'));
    let list: any = localStorage.getItem('sessionToken');
     const decryptKey = CryptoJS.AES.decrypt(list,'my-secret-key')
     const originalText = decryptKey.toString(CryptoJS.enc.Utf8);
     this.arr=JSON.parse(originalText);
     console.log(this.arr)

    // console.log(typeof this.list);
  }
  // data = this.userDetail.getUserById(this.route.snapshot.params['id']).subscribe((res) => {
  //   console.log(res);
  //   this.x = res;
  // })
}
