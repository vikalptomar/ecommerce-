import { Component, ElementRef, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent {
  list: any = [];
  filter = '';
  categoryList: any = [];
  isLoading = true; //for loading
  isScrolledDown: boolean = false;// for button to scroll
  faArrowCircleUp = faArrowCircleUp

  constructor(private product_instance: ProductService, private elementRef: ElementRef, private route: ActivatedRoute, private router: Router,
    private cartService: CartService) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolledDown = (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop) > 200;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.product_instance.getProducts().subscribe((data: any) => {
      this.list = data.products;
      this.isLoading = false;
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
      this.categoryList = Array.from(uniqueCategories);
      console.log(this.categoryList);
    })
  }

  parFunction(data: any) {
    console.log(data);
    this.filter = data;
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = this.elementRef.nativeElement.querySelector(`#${fragment}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  addCart(id: any) {
    console.log("cart clicked = ", id);
    // let cartData = this.cartService.getCartData();
    // console.log(cartData);
    this.cartService.addCartData(id);
    // this.cartService.addCartData(id).filter((res)=>{
    //   res
    // })
  }

  Itemfilter(catName: any) {
    let filterItems = this.list.filter((item: any) => item.category === catName).splice(0, 4)
    return filterItems
  }

}
