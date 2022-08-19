import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { AuthGuard } from '../guards/auth-guard.service';
import { ShoppingCartService } from './services/shopping-cart.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    UserService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
  ]
})
export class SharedModule { }
