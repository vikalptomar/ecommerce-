import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent {
  
  list: any = [];
  filter = '';

  constructor(private allusers: AdminService) { }
  
  ngOnInit(): void {
    this.allusers.getAllUsers().subscribe((data: any) => {
      this.list = data.users;
      console.log(this.list);
    })
  }
  parFunction(data: any) {
    // console.log(data);
    this.filter = data;
    return this.filter;
  }
}

// const searchFilter = this.list.filter((res: { firstName: string; }) =>
//   res.firstName.toLowerCase().includes(this.filter.toLowerCase())
// )
// console.log("data="+searchFilter);