import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  // data: any;
  // check: any;
  id: any;
  cartItems: any[] = [];

  constructor(private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product.getProductsById(this.id = this.route.snapshot.params['id']).subscribe((res) => {
      const c=typeof(res.toString);this.cartItems = JSON.parse(c);
      const existingCartItems = localStorage.getItem('cartItems');
      if (existingCartItems) {
        this.cartItems = JSON.parse(existingCartItems);
      }
    })
  }
  addToCart(item: any): void {
    this.cartItems.push(item);
    this.saveCartItems();
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCartItems();
  }

  saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  // cart() {
  //   this.product.getProductsById(this.id = this.route.snapshot.params['id']).subscribe((res) => {
  //     const cartvalue = res;
  //     this.data = localStorage.setItem('cartdata', JSON.stringify(cartvalue));
  //     console.log(this.data);
  //   })
  // }
  // checkcart() {
  //   this.check = localStorage.removeItem('cartdata');
  // }
}