import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  data: any;
  cartItems: any[] = [];
  totalproduct: any;
  totPrice: any = 0
  totDiscPrice: any = 0
  countForPromo = 0;
  applied = "";
  productQuantity: number = 1;
  parentdata: number = 1;

  couponForm = new FormGroup({
    promo: new FormControl('')
  })

  constructor(private product: ProductService, private route: ActivatedRoute, private cartService: CartService, private checkoutservice: CheckoutService) { }

  ngOnInit(): void {
    let add = 0
    this.getCartItems();
    this.totalproduct = this.cartItems.length;

    this.cartItems.filter((val) => {
      this.totPrice += val.price;
      this.totDiscPrice += ((val.price) - (((val.discountPercentage) * (val.price)) / 100))
    })

  }

  getCartItems() {
    this.cartItems = this.cartService.getCartData()
  }

  removeFromCart(id: number) {
    this.cartService.removeCartData(id);
    this.getCartItems()
  }

  handelQuantity(data: any, id: number) {

    // if (data === 'min' && this.productQuantity > 1) {
    //   this.productQuantity -= 1;
    // }
    // else if (data === 'plus' && this.productQuantity < 10) {
    //   this.productQuantity += 1;
    // }
    // this.parentdata = this.productQuantity;
    
    this.cartService.getCartData().filter((res) => {
      if (res.id == id) {
        if (data === 'min' && this.productQuantity > 1) {
          this.productQuantity -= 1;
        }
        else if (data === 'plus' && this.productQuantity < 10) {
          this.productQuantity += 1;
        }
        this.parentdata = this.productQuantity;
      }
      else{
        this.productQuantity
      }
    })

  }

  checkCoupon() {
    if (this.countForPromo == 0) {

      if (this.couponForm.value.promo == "#megaBull's") {
        this.totDiscPrice = (this.totDiscPrice - (((this.totDiscPrice) * 70) / 100)).toFixed(2)
        this.applied = "Congratulations! 70% Off";
        this.countForPromo++;
      }
      else {
        console.log("wrong code");

      }
      console.log(this.totDiscPrice);

    }
  }

  checkout() {
    this.checkoutservice.totalproductvalue = this.totDiscPrice;
    console.log(this.totDiscPrice);

  }

}