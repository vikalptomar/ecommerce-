import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  constructor(private products: ProductService, private route: ActivatedRoute, private router: Router) { }
  homeicon=faHome;
  list: any = [];
  cat: string = '';
  filter='';
  ngOnInit(): void {
    this.cat = this.route.snapshot.params['category'];
    console.log(this.cat);
    this.products.getProducts().subscribe((res: any) => {
      this.list = res.products.filter((product: any) => product.category === this.cat)
    })
  }
  
  
  // searchForm=new FormGroup({
  //   title: new FormControl('')
  // })
  // search(){
  //   console.log();
  //   this.products.getProducts().subscribe((res:any)=>{
  //     // console.log(res.products);
  //     let result=res.products;
  //     let filter=result.filter((data:any)=>{
  //       if(this.searchForm.value.title===data.title){
  //         console.log(data.title);
  //         this.router.navigate([`/products/`+data.id]);
  //       }
  //     })
  //   })
  // }
}
