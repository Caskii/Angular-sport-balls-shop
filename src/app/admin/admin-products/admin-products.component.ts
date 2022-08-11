import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Products|any>;

  constructor(private productService:ProductService) {
    this.products$ = this.productService.getall();
    this.products$.subscribe(a=>console.log(a));
   }

  ngOnInit(): void {
  }

}
