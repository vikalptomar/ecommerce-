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

const routes: Routes = [
  {path:"",component:LoginComponent, canActivate:[AuthGuard2]},
  {path:"users",component:AllUserComponent},
  {path:"signup",component:SignupComponent},
  {path:"products",component:AllProductComponent, canActivate:[AuthGuard]},
  {path:"products/:id",component:ProductsByIdComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
