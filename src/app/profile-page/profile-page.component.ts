import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  constructor(private userDetail: AdminService, private route: ActivatedRoute) { }
  list: any = {};

  ngOnInit(): void {
    console.log("hi");
    // console.log(localStorage.getItem('sessionToken'));
    let list: any = localStorage.getItem('sessionToken');
    this.list = JSON.parse(list)
    // console.log(typeof this.list);
  }
  // data = this.userDetail.getUserById(this.route.snapshot.params['id']).subscribe((res) => {
  //   console.log(res);
  //   this.x = res;
  // })
}
