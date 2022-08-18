import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../Services/auth.service';
import { OrderService } from '../Services/order.service';
import { ShoppingCartService } from '../Services/shopping-cart.service';

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
