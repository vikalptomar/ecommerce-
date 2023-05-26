import { Component } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent {
  constructor(private product_instance: ProductService) { }
  list: any = [];
  categoryList: any =[];
  ngOnInit(): void {
    this.product_instance.getProducts().subscribe((data: any) => {
      this.list = data.products;
      console.log(this.list);
      //Used localeCompare to sort array with category
      this.list.sort(function (a: any, b: any) {
        return a.category.localeCompare(b.category);
      })
      console.log(this.list);

      // Use map() to extract categories into a new array (we can also use for loop)
      let categoriesArray = this.list.map(function (item: any) {
        return item.category;
      });

      // Create a Set from the categories array to remove duplicates
      let uniqueCategories = new Set(categoriesArray);
      console.log(uniqueCategories);

      // Get the total number of unique categories
      let totalCategories = uniqueCategories.size;

      // Print the total number of categories
      console.log('Total number of categories:', totalCategories);

      //Create array that stores set uniqueCategories
      this.categoryList= Array.from(uniqueCategories);
      console.log(this.categoryList);
    })
  }
}
