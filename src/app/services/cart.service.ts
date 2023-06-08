import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  static removeCartData(id: number) {
    throw new Error('Method not implemented.');
  }

  arr: any[] = [];
  message = 0;
  constructor(private products: ProductService, private route: ActivatedRoute,
    private toastr: ToastrService) { }

  getCartData() {
    let items: any = localStorage.getItem('cartItems');
    this.arr = JSON.parse(items)
    return this.arr
  }

  addCartData(id: number) {
    new Promise((resolve, reject) => {
      const existingData = localStorage.getItem('cartItems');
      if (existingData) {
        this.arr = JSON.parse(existingData)
        this.products.getProductsById(id).subscribe((res) => {
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
          let i, a = 0;
          for (i = 0; i < this.arr.length; i++) {
            if (this.arr[i].id == id) {
              a = 1;
            }
          }
          // a == 0 ? this.arr.push(res) : console.log("duplicate");
          if (a == 0) {
            debugger;
            this.arr.push(res);
            localStorage.setItem('cartItems', JSON.stringify(this.arr));
            resolve(true)
            this.toastr.success('Success', 'Item added Successfully');
          }
          else {
            debugger;
            console.log("duplicate");
            resolve(false)
            this.toastr.warning('Go to Cart', 'Item already added');
          }
        })
      }
    });
  }

  removeCartData(id: number) {
    let i, a = 0;
    const existingData = localStorage.getItem('cartItems');
    if (existingData) {
      this.arr = JSON.parse(existingData)

      for (i = 0; i < this.arr.length; i++) {
        if (this.arr[i].id == id) {
          a = i;
          break;
        }
      }
      console.log("log=", id);
      console.log("array length", this.arr.length);
      this.arr.splice(a, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.arr))
    }
  }

}
