import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCartShopping, faHome } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { IdService } from 'src/app/services/id.service';
// import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  homeicon = faHome;
  list: any = [];
  length: number = 0;
  cat: string = '';
  filter = '';
  carticon = faCartShopping;
  isLoading = true; //for loading
  constructor(
    private products: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private IdService: IdService
  ) {

  }
  ngOnInit(): void {
    this.cat = this.route.snapshot.params['category'];

    this.getCategory()
    // console.log(this.cat);

    this.IdService.getId().subscribe((res) => {
      if (res) {
        this.cat = res;
        this.getCategory();
      }
    })

  }
  getCategory() {
    if (typeof this.cat === "string") {
      this.products.getProducts().subscribe((res: any) => {
        this.isLoading = false;
        this.list = res.products.filter((product: any) => product.category === this.cat)
        this.length = this.list.length;
        if (this.length == 0) {
          this.router.navigate(['404']);
        }
      })
    }
  }
  addCart(id: number) {
    this.cartService.addCartData(id);
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
