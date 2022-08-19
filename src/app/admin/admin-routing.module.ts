import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminAuthGuard } from '../guards/admin-auth-guard.service';
import { AuthGuard } from '../guards/auth-guard.service';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
  { path:'admin/produits/nouveau', component:AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/produits/:id', component:AdminProductFormComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/produits', component:AdminProductsComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/commandes/:id', component:AdminOrderDetailComponent, canActivate: [AuthGuard,AdminAuthGuard]},
  { path:'admin/commandes', component:AdminOrdersComponent, canActivate: [AuthGuard,AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
