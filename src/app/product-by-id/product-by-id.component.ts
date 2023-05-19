import { Component,OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductsByIdComponent {
  constructor(private product_instance:ProductService, private route:ActivatedRoute){  }
  list:any=[];
  x:any;
  ngOnInit(): void{
    this.product_instance.getProducts().subscribe((data)=>{
      this.list=data;
    })
  }
  data=this.product_instance.getProductsById(this.route.snapshot.params['id']).subscribe((res)=>{
    console.log(res);
    this.x=res;
  })
}
