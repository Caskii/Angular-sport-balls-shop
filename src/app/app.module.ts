import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    LoginComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
