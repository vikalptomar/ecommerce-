import { Component ,Output,EventEmitter, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { IdService } from 'src/app/services/id.service';
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
  // filteredList for Model keyup
  filteredList: any[] = [];
  
  constructor(
    private router: Router, 
    private product_instance: ProductService,
    private IdService : IdService
    ) { }
  
  @Output() parentfunc:EventEmitter<any>=new EventEmitter()
  ngOnInit(): void {
    this.product_instance.getProducts().subscribe((res:any)=>{
      this.list=res.products;
      // console.log(this.list);
    })
    this.handleSearch()
  }

  inputSearch(event:any){
    this.parentfunc.emit(this.filter)
    this.filter = event.target.value;
    console.log('Input Value:', this.filter);
    this.handleSearch()
  }
  handleSearch(): void {
    this.filteredList = this.list.filter((item:any) =>
      item.title.toLowerCase().includes(this.filter.toLowerCase()) ||
      item.category.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  
  // navigateAndCloseModal(event: MouseEvent): void {
  //   event.preventDefault(); // Prevent the default navigation behavior
  //   //$('#exampleModal').modal('hide'); // Replace with the correct ID of your modal

  //   const target = event.target as HTMLAnchorElement;
  //   const route = target.getAttribute('routerLink');
  //   if (route) {
  //     this.router.navigate([route]);
  //   }
  // }

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
  
  setId(product:any){
    this.IdService.setId(product)
  }
}
