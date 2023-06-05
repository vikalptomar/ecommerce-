import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductsByIdComponent {
  productData: any = [];
  productQuantity: number = 1;
  parentdata: number = 1;
  homeicon = faHome;
  id?: any;
  cartItems: any = [];
  constructor(private product_instance: ProductService, private route: ActivatedRoute, private routers: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.product_instance.getProductsById(this.id).subscribe((res) => {
      // console.log(res);
      this.productData = res;
    })
  }

  addCart() {
    //Retrieve the existing data from the local storage using the specified key.
    const existingData = localStorage.getItem('cartItems');
    if (existingData) {
      this.cartItems = JSON.parse(existingData)
    }

    // Add the new product to the cartItems array.
    const newProduct = this.productData;

    this.cartItems.push(newProduct);
    console.log(this.cartItems);

    //Convert the cartItems array back to a JSON string using JSON.stringify().
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.routers.navigate(['cart'])

  }

  handelQuantity(data: any) {
    if (data === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
    else if (data === 'plus' && this.productQuantity < 10) {
      this.productQuantity += 1;
    }
    this.parentdata = this.productQuantity;
  }
  destroy() {
    localStorage.removeItem('cartItems')
  }
}
