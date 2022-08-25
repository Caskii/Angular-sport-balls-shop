import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }

  async saveOrder(order:any){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  getall(){
    return this.db.list('/orders').snapshotChanges().pipe(map(actions => {
      return actions.map(p => {
        const key = p.payload.key;
        const data = p.payload.val();
        return {key,data};
      });
     }));
  }
  get(orderId:string){
    return this.db.object('/orders/'+orderId).valueChanges();
  }
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
  delete(orderId:string){
    return this.db.object('/orders/'+orderId).remove();
  }
  updateStatus(orderId:string,status:boolean){
    return this.db.object('/orders/'+orderId).update({sent:status});
  }
}
