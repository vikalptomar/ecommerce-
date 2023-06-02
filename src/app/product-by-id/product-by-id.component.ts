import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductsByIdComponent {
  list: any = [];
  data: any;
  productQuantity: number = 1;
  parentdata: number = 1;
  homeicon = faHome;
  id?:any;
  constructor(private product_instance: ProductService, private route: ActivatedRoute) {
    this.id=this.route.snapshot.params['id'];
   }
 
  ngOnInit(): void {
    this.product_instance.getProducts().subscribe((data: any) => {
      this.list = data.products;
      this.ProductList();
    })
  }
  ProductList(){
   this.product_instance.getProductsById(this.id).subscribe((res) => {
    // console.log(res);
    this.data = res;
  })
}
  handelQuantity(data: any) {
    if (data === 'min' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
    else if (data === 'plus' && this.productQuantity < 10) {
      this.productQuantity += 1;
    }
    this.parentdata=this.productQuantity;
    
  }
}
