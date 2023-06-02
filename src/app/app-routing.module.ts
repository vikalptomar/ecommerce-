import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductsByIdComponent } from './product-by-id/product-by-id.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { AuthGuard2 } from './auth2.guard';
import { AllUserComponent } from './all-user/all-user.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:"",component:LoginComponent, canActivate:[AuthGuard2]},
  {path:"users",component:AllUserComponent},
  {path:"header",component:HeaderComponent},
  {path:"signup",component:SignupComponent},
  {path:"products",component:AllProductComponent, canActivate:[AuthGuard]},
  {path:"profile-page",component:ProfilePageComponent, canActivate:[AuthGuard]},
  {path:"products/:id",component:ProductsByIdComponent, canActivate:[AuthGuard]},
  {path:"cart/:id",component:CartComponent, canActivate:[AuthGuard]},
  {path:"checkout",component:CheckoutComponent, canActivate:[AuthGuard]},
  {path:"product/:category",component:ProductCategoryComponent, canActivate:[AuthGuard]},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
