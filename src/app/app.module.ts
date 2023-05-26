import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductsByIdComponent } from './product-by-id/product-by-id.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { AllUserComponent } from './all-user/all-user.component';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
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
    ProductCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
