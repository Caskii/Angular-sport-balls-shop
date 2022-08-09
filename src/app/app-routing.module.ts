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

const adminOnly = () => hasCustomClaim('admin');
const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'produits', component:ProductsComponent },
  { path:'panier', component:ShoppingCartComponent },
  { path:'connexion', component:LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path:'caisse', component:CheckOutComponent, canActivate: [AngularFireAuthGuard] },
  { path:'commande-reussie', component:OrderSuccessComponent, canActivate: [AngularFireAuthGuard] },
  { path:'profil/commandes', component:MyOrdersComponent, canActivate: [AngularFireAuthGuard]},
  { path:'admin/produits', component:AdminProductsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly } },
  { path:'admin/commandes', component:AdminOrdersComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly } },
  { path:'**', component:NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
