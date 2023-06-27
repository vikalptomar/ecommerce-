import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  static removeCartData(id: number) {
    throw new Error('Method not implemented.');
  }

  arr: any[] = [];
  arr2: any[] = [];

  message = 0;
  totalproduct: number = 0;

  constructor(private products: ProductService, private route: ActivatedRoute,
    private toastr: ToastrService,
    private IdService: IdService) { }

  getCartData() {
    let items: any = localStorage.getItem('cartItems');
    this.arr = JSON.parse(items)
    this.IdService.setcartValue(this.arr.length);
    this.IdService.setcartDetails(this.arr);
    return this.arr
  }

  addCartData(id: number) {
    new Promise((resolve, reject) => {
      let existingData = localStorage.getItem('cartItems');
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
            this.arr.push(res);
            localStorage.setItem('cartItems', JSON.stringify(this.arr));
            resolve(true)
            this.getCartData()
            this.toastr.success('Success', 'Item added Successfully');
          }
          else {
            console.log("duplicate");
            resolve(false)
            this.toastr.warning('Go to Cart', 'Item already added');
          }
        })
      }
      else{
        this.products.getProductsById(id).subscribe((res) => {
            this.arr.push(res);
            let item: any=localStorage.setItem('cartItems', JSON.stringify(this.arr));
            this.arr = JSON.parse(item)
            this.toastr.success('Success', 'Item added Successfully');
        })
      }
    });
  }

  removeCartData(id: number) {
    let i, a = 0;
    let existingData:any =this.getCartData();
    let removeItem = existingData.filter((item:any) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(removeItem))
    this.getCartData()


      // for (i = 0; i < this.arr.length; i++) {
      //   if (this.arr[i].id == id) {
      //     a = i;
      //     break;
      //   }
      // }

      // console.log("log=", id);
      // console.log("array length", this.arr.length);
      // this.arr.splice(a, 1);
    
   
      //this.IdService.setcartValue(this.arr.length);
    
  }
}
