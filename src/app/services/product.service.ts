import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url="https://dummyjson.com/products";
  constructor(private http:HttpClient ) {}
 
  list:any=[];
  getProducts(){
    return this.http.get(this.url)
  }
  getProductsById(id:number){
    return this.http.get(`${this.url}/${id}`)
  }
  getCartData(id:number){
    return this.http.get(`${this.url}/${id}`)
  }
}
