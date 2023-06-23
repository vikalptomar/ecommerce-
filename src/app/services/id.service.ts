import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  private id = new BehaviorSubject<any>("")
  private cartValue = new BehaviorSubject<any>("")


  constructor() {  }

  setId(id:any){
    this.id.next(id)
  }
  
  getId(){
    return this.id.asObservable()
  }

  setcartValue(cartValue:any){
    this.cartValue.next(cartValue)
  }
  
  getcartValue(){


    return this.cartValue.asObservable()

  }
}
