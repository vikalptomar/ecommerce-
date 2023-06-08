import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-signup/login/login.component';
import { AllProductComponent } from './products/all-product/all-product.component';
import { ProductsByIdComponent } from './products/product-by-id/product-by-id.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { AllUserComponent } from './user/all-user/all-user.component';
import { HeaderComponent } from './common/header/header.component';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { ProductCategoryComponent } from './products/product-category/product-category.component';
import { FooterComponent } from './common/footer/footer.component';
import { CartComponent } from './carts/cart/cart.component';
import { SearchPipe } from './pipes/search.pipe';
import { CheckoutComponent } from './carts/checkout/checkout.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    AllProductComponent,
    ProductsByIdComponent,
    PageNotFoundComponent,
    SignupComponent,
    AllUserComponent,
    HeaderComponent,
    ProfilePageComponent,
    ProductCategoryComponent,
    FooterComponent,
    CartComponent,
    SearchPipe,
    CheckoutComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
