import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    AdminProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrderDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    DataTablesModule,
  ]
})
export class AdminModule { }
