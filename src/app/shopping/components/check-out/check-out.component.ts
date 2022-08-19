import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart$ : Observable<ShoppingCart> |undefined;
  cart! : ShoppingCart;
  userSubscription! : Subscription;
  cartSubscription! : Subscription;
  userId:string|undefined;

  constructor(
    private router:Router,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private authService:AuthService) { }
  
  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user=>this.userId = user?.uid);
    this.cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = this.cart$.subscribe(cart=>{
      this.cart=cart;
      if(!cart.items.length) this.router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }

  async placeOrder(address:any){
    if(this.userId != undefined){
      let order = new Order(this.userId,address,this.cart);
      let result = await this.orderService.saveOrder(order);
      this.router.navigate(['/commande-reussie',result.key]);
    }
  }
}
