import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe,take,map, Subscription, switchMap } from 'rxjs';
import { Products } from '../models/products';
import { ProductService } from '../Services/product.service';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[]=[];
  filteredProducts: Products[]=[];
  category: string | null=null;

  cartSubscription:Subscription  | undefined = undefined;
  cart:any;

  constructor(
    productService: ProductService,
    private shoppingCartService:ShoppingCartService,
    route:ActivatedRoute) {
    productService.getall().pipe(switchMap(productsList=>{
      productsList.forEach((p:any)=>   this.products.push({
        key: <string>p.key, 
        category: <string>p.data.category,
        imageUrl: <string>p.data.imageUrl,
        price: <number>p.data.price, 
        title: <string>p.data.title,        
      })
      );
      return route.queryParamMap;
    }))
    .subscribe((params:any)=>{
      this.category = params.get('category');
      this.filteredProducts= (this.category) ?
        this.products.filter(p=>p.category.toLowerCase()===this.category?.toLowerCase()):
        this.products;
    });
   }

  async ngOnInit() {
    this.cartSubscription = (await this.shoppingCartService.getCart()).subscribe(cart =>this.cart=cart);
  }
  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  addToCart(product:Products){
    this.shoppingCartService.addToCart(product);
  }
  removeFromCart(product:Products){
    this.shoppingCartService.removeFromCart(product);
  }
  getQuantity(){
    /*if(!this.cart) return null;
    let a = this.shoppingCartService.getItemRef(this.cart.key,'-N9WkUwFEwqWB7EvGbE3').valueChanges().pipe(take(1));
    return(a);*/
    
  }
}
