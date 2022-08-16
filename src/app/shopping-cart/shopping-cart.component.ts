import { Component, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$:Observable<any> | undefined;

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ =  await this.shoppingCartService.getCart();
  }

}
