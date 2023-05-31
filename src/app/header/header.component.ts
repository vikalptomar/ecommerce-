import { Component ,Output,EventEmitter, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  filter='';
  usericon = faUser;
  homeicon = faHome;
  carticon = faCartShopping;
  list:any=[];
  constructor(private router: Router, private product_instance: ProductService) { }
  @Output() parentfunc:EventEmitter<any>=new EventEmitter()
  ngOnInit(): void {
    this.product_instance.getProducts().subscribe((res:any)=>{
      this.list=res.products;
      console.log(this.list);
    })
  }
  test(event:any){
    this.parentfunc.emit(this.filter)
    this.filter = event.target.value;
    console.log('Input Value:', this.filter);
  }

  // searchForm = new FormGroup({
  //   title: new FormControl('')
  // })
  // search(){
  //   console.log();
  //   this.product_instance.getProducts().subscribe((res:any)=>{
  //     // console.log(res.products);
  //     let result=res.products;
  //     let filter=result.filter((data:any)=>{
  //       if(this.searchForm.value.title===data.title){
  //         console.log(data.title);
  //         this.router.navigate([`products/`+data.id]);
  //       }
  //     })
  //   })
  // }

  profile() {
    this.router.navigate(['profile-page']);
  }
  logout() {
    // this.router.navigate(['']);
    // Remove the session token from localStorage
    localStorage.removeItem('sessionToken');
  }
}
