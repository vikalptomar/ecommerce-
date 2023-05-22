import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent {
  constructor(private allusers: AdminService) { }

  list:any=[];
  ngOnInit(): void{
    this.allusers.getAllUsers().subscribe((data: any) => {
      console.log(data.users);
      this.list=data.users;
    })
  }
}
