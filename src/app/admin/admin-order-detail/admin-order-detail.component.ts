import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  order$: Observable<any> | undefined;
  id:string|null;

  constructor(
    private orderService:OrderService,
    private route: ActivatedRoute,
    private router:Router) { 
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id)
        this.order$ = this.orderService.get(this.id);
  }

  ngOnInit(): void {
  }
  update(status:boolean){
    if(this.id)
      this.orderService.updateStatus(this.id,status);
  }
  delete(){
    if(this.id){
      if(confirm('Voulez-vous vraiment supprimer cette commande ?')){
        this.orderService.delete(this.id);
        this.router.navigate(['/admin/commandes']);
      }
    }
  }

}
