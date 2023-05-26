import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  usericon = faUser;
  homeicon = faHome;
  list:any=[];
  constructor(private router: Router, private product_instance: ProductService) { }
  ngOnInit(): void {
  }
  searchForm = new FormGroup({
    title: new FormControl('')
  })
  search(){
    console.log();
    this.product_instance.getProducts().subscribe((res:any)=>{
      // console.log(res.products);
      let result=res.products;
      let filter=result.filter((data:any)=>{
        if(this.searchForm.value.title===data.title){
          console.log(data.title);
          this.router.navigate([`products/`+data.id]);
        }
      })
    })
  }
  profile() {
    this.router.navigate(['profile-page']);
  }
  logout() {
    this.router.navigate(['']);
    // Remove the session token from localStorage
    localStorage.removeItem('sessionToken');
  }
}
