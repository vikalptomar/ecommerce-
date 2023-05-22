import { Component } from '@angular/core';
import {ProductService} from '../product.service';
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent {
  constructor(private product_instance:ProductService){  }
  list:any=[];
  ngOnInit(): void{
    this.product_instance.getProducts().subscribe((data: any)=>{
      this.list=data.products;
      console.log(this.list);  
    })
  }
  
}
