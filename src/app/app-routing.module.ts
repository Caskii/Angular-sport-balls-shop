import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard,hasCustomClaim, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'produits', component:ProductsComponent },
  { path:'panier', component:ShoppingCartComponent },
  { path:'connexion', component:LoginComponent },
  { path:'caisse', component:CheckOutComponent, canActivate: [AuthGuard] },
  { path:'commande-reussie', component:OrderSuccessComponent, canActivate: [AuthGuard]},
  { path:'profil/commandes', component:MyOrdersComponent, canActivate: [AuthGuard]},
  { path:'admin/produits/nouveau', component:AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/produits', component:AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/commandes', component:AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'**', component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
