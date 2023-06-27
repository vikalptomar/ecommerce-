import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { faUser, faHome, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { IdService } from 'src/app/services/id.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  filter = '';
  usericon = faUser;
  homeicon = faHome;
  carticon = faCartShopping;
  list: any = [];
  totPrice=0;
  totDiscPrice=0;
  // filteredList for Model keyup
  filteredList: any[] = [];
  cartItems: any[] = [];
  totalproduct: number = 0;

  constructor(
    private router: Router,
    private product_instance: ProductService,
    private IdService: IdService,
    private cartService: CartService
  ) { }

  @Output() parentfunc: EventEmitter<any> = new EventEmitter()
  ngOnInit(): void {

    this.getCartItems();
    this.product_instance.getProducts().subscribe((res: any) => {
      this.list = res.products;
      // console.log(this.list);
    })

    this.handleSearch()

    this.getCartItems();
    this.totalproduct = this.cartItems.length;

    // this.IdService.setcartValue(this.totalproduct);

    this.IdService.getcartValue().subscribe((res) => {
      this.totalproduct = res;
    })
    this.IdService.getcartDetails().subscribe((res) => {
      this.cartItems = res;
    })
    this.cartItems.filter((val) => {
      this.totPrice += val.price;
      this.totDiscPrice += ((val.price) - (((val.discountPercentage) * (val.price)) / 100))
    })
  }

  inputSearch(event: any) {
    this.parentfunc.emit(this.filter)
    this.filter = event.target.value;
    console.log('Input Value:', this.filter);
    this.handleSearch()
  }
  handleSearch(): void {
    this.filteredList = this.list.filter((item: any) =>
      item.title.toLowerCase().includes(this.filter.toLowerCase()) ||
      item.category.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
  getCartItems() {
    this.cartItems = this.cartService.getCartData()
  }


  profile() {
    this.router.navigate(['profile-page']);
  }
  logout() {
    // this.router.navigate(['']);
    // Remove the session token from localStorage
    localStorage.removeItem('sessionToken');
  }

  setId(product: any) {
    this.IdService.setId(product)
  }

  remove(id:number){
    this.cartService.removeCartData(id);
    this.getCartItems();
  }
}