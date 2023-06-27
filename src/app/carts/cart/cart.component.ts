import { Component, ElementRef, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckoutService } from 'src/app/services/checkout.service';
import { faAdd, faArrowCircleUp, faSubtract, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { IdService } from 'src/app/services/id.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  data: any;
  cartItems: any[] = [];
  totalproduct: any;
  totPrice: any = 0;
  totDiscPrice: any = 0
  countForPromo = 0;
  applied = "";
  productQuantity: any = [];
  basetotPrice: any = [];

  faAdd = faAdd;
  faSubtract = faSubtract;
  faTrash = faTrashCan;
  faArrowCircleUp = faArrowCircleUp
  isScrolledDown: boolean = false;// for button to scroll
  itemId: number = 0;

  couponForm = new FormGroup({
    promo: new FormControl('')
  })

  constructor(private product: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private checkoutservice: CheckoutService,
    private idService: IdService
  ) {
    let i = 0;
    for (i = 0; i < 30; i++) {
      this.productQuantity[i] = 1
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolledDown = (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  ngOnInit(): void {
    let add = 0
    this.getCartItems();
    
    this.totalproduct = this.cartItems.length;
    // this.idService.setcartValue(this.totalproduct);
    this.idService.getcartValue().subscribe((res)=>{
      this.totalproduct=res;
    })
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

  async incQuantity(id: number) {
    --id;
    if (this.productQuantity[id] < 10) {
      this.productQuantity[id] += 1

      await this.product.getProductsById(id + 1).subscribe((val) => {
        console.log(val);
        this.basetotPrice = val;
        if (this.productQuantity[id] > 1) {
          console.log("base=", this.basetotPrice.price);
          this.totPrice = this.totPrice + this.basetotPrice.price;
          this.totDiscPrice += ((this.basetotPrice.price) - (((this.basetotPrice.discountPercentage) * (this.basetotPrice.price)) / 100))
        }
      })
    }
  }
  async decQuantity(id: number) {
    --id;
    if (this.productQuantity[id] > 0) {
      this.productQuantity[id] -= 1

      await this.product.getProductsById(id + 1).subscribe((val) => {
        console.log(val);
        this.basetotPrice = val;
        if (this.productQuantity[id] > 0) {
          console.log("base=", this.basetotPrice.price);
          this.totPrice = this.totPrice - this.basetotPrice.price;
          this.totDiscPrice -= ((this.basetotPrice.price) - (((this.basetotPrice.discountPercentage) * (this.basetotPrice.price)) / 100))
        }
      })
    }
  }

  remove(id: number) {
    this.itemId = id;
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