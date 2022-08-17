import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe,take,map, Subscription, switchMap, Observable } from 'rxjs';
import { Products } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';
import { ProductService } from '../Services/product.service';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Products[]=[];
  filteredProducts: Products[]=[];
  category: string | null=null;

  cart$:Observable<ShoppingCart> | undefined;

  constructor(
    private productService: ProductService,
    private shoppingCartService:ShoppingCartService,
    private route:ActivatedRoute) {  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  public addToCart(product:Products){
    this.shoppingCartService.addToCart(product);
  }
  private applyFilter(){
    this.filteredProducts= (this.category) ?
    this.products.filter(p=>p.category.toLowerCase()===this.category?.toLowerCase()):
    this.products;
  }
  private populateProducts(){
    this.productService.getall().pipe(switchMap(productsList=>{
      productsList.forEach((p:any)=>   this.products.push({
        key: <string>p.key, 
        category: <string>p.data.category,
        imageUrl: <string>p.data.imageUrl,
        price: <number>p.data.price, 
        title: <string>p.data.title,        
      })
      );
      return this.route.queryParamMap;
    }))
    .subscribe((params:any)=>{
      this.category = params.get('category');
      this.applyFilter();
    });
  }
}
