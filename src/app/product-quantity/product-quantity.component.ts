import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product!:Products;
  @Input('shopping-cart') cart!:ShoppingCart; 

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(product:Products){
    this.shoppingCartService.addToCart(product);
  }
  removeFromCart(product:Products){
    this.shoppingCartService.removeFromCart(product);
  }

}
