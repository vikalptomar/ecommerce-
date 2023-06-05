import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './products/all-product/all-product.component';
import { ProductsByIdComponent } from './products/product-by-id/product-by-id.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuard2 } from './guards/auth2.guard';
import { AllUserComponent } from './user/all-user/all-user.component';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { ProductCategoryComponent } from './products/product-category/product-category.component';
import { CartComponent } from './carts/cart/cart.component';
import { HeaderComponent } from './common/header/header.component';
import { CheckoutComponent } from './carts/checkout/checkout.component';

const routes: Routes = [
  {path:"",component:LoginComponent, canActivate:[AuthGuard2]},
  {path:"users",component:AllUserComponent},
  {path:"header",component:HeaderComponent},
  {path:"signup",component:SignupComponent},
  {path:"products",component:AllProductComponent, canActivate:[AuthGuard]},
  {path:"profile-page",component:ProfilePageComponent, canActivate:[AuthGuard]},
  {path:"products/:id",component:ProductsByIdComponent, canActivate:[AuthGuard]},
  {path:"cart",component:CartComponent, canActivate:[AuthGuard]},
  {path:"checkout",component:CheckoutComponent, canActivate:[AuthGuard]},
  {path:"product/:category",component:ProductCategoryComponent, canActivate:[AuthGuard]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
