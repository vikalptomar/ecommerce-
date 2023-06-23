import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { IdService } from 'src/app/services/id.service';
import { PageNotFoundComponent } from 'src/app/common/page-not-found/page-not-found.component';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductsByIdComponent implements OnInit {
  productData: any = [];
  productQuantity: number = 1;
  parentdata: number = 1;
  homeicon = faHome;
  id?: any;
  cartItems: any = [];
  list: any = [];
  inputValue: string = "name";
  isLoading = true;  //for loading


  constructor(
    private product_instance: ProductService,
    private route: ActivatedRoute, private routers: Router,
    private cartservice: CartService,
    private location: Location,
    private checkoutservice: CheckoutService,
    private IdService: IdService

  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getProduct(this.id)
    //loop of ngOnInit
    this.IdService.getId().subscribe((res) => {
      if (res)
       this.getProduct(res)
    })
  }

  getid(id: any) {
    this.IdService.setId(id);
  }

  getProduct(id: any) {
    this.product_instance.getProductsById(id).subscribe((res) => {
      console.log("value", res);
      this.isLoading=false;
      this.productData = res;
    })
  }
  // ((productData.price)-((productData.price*productData.discountPercentage)/100))
  addCart(id: number) {
    this.cartservice.addCartData(id);

  }
  checkout() {
    this.checkoutservice.totalproductvalue = ((this.productData.price)-((this.productData.price * this.productData.discountPercentage)/100));
  }
}


  // addCart() {
  //   //Retrieve the existing data from the local storage using the specified key.
  //   const existingData = localStorage.getItem('cartItems');
  //   if (existingData) {
  //     this.cartItems = JSON.parse(existingData)
  //   }

  //   // Add the new product to the cartItems array.
  //   const newProduct = this.productData;

  //   this.cartItems.push(newProduct);
  //   console.log(this.cartItems);

  //   //Convert the cartItems array back to a JSON string using JSON.stringify().
  //   localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  //   this.routers.navigate(['cart'])

  // }