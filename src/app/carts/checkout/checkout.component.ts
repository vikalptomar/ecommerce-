import { Component } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totdiscprice: any
  constructor(private checkoutservice:CheckoutService){}
  ngOnInit():void {
    this.totdiscprice=this.checkoutservice.totalproductvalue;
    console.log(this.totdiscprice);
  }
}
