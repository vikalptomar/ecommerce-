import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent {
  constructor(private products: ProductService, private route: ActivatedRoute) { }
  list: any = [];
  cat: string = '';

  ngOnInit(): void {
    this.cat = this.route.snapshot.params['category'];
    this.products.getProducts().subscribe((res: any) => {
      this.list = res.products.filter((product: any) => product.category === this.cat)
    })
  }
}
