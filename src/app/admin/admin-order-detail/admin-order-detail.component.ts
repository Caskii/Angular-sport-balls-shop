import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  order$: Observable<any> | undefined;
  id:string|null;

  constructor(private orderService:OrderService,private route: ActivatedRoute) { 
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id){
       this.order$ = this.orderService.get(this.id).pipe(take(1));
      }
  }

  ngOnInit(): void {
  }

}
