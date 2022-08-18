import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { OrderService } from '../Services/order.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: any;
  
  constructor( private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap((u: any) => orderService.getOrdersByUser(u.uid)));
   }
}
