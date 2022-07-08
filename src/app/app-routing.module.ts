import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  {path:'', redirectTo:'Products', pathMatch:'full'},
  {path:'Products',component:ProductsComponent},
  {path:'Cart',component:CartComponent},
  {path:'success',component:SuccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
