import { query } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  products: any[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService:ProductService) {
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.productService.getall()
    .subscribe(data => {
      this.products = data;
      this.dtTrigger.next(this.dtOptions);
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
