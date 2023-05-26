import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signUp } from './data-type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url="https://dummyjson.com/users"
  constructor(private http:HttpClient) { }
  
  userLogin(){
    return this.http.get(this.url)
  }
  userSignUp(data:signUp){
    return this.http.post(this.url,data);
  }
  getAllUsers(){
    return this.http.get(this.url);
  }
  getUserById(id:number){
   return this.http.get(`${this.url}/${id}`)
  } 
  
}
