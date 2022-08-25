import { Component, OnInit } from '@angular/core';
import { Subject,map, switchMap } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private orderService:OrderService,private userService:UserService) {
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.orderService.getall()
    .subscribe(data => {
      this.orders = data;
      this.dtTrigger.next(this.dtOptions);
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
