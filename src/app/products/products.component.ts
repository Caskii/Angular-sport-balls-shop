import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[]=[];
  filteredProducts: any[]=[];
  category: string | null=null;

  constructor(
    productService: ProductService,
    route:ActivatedRoute) {
    productService.getall().pipe(switchMap(products=>{
      this.products=products;
      return route.queryParamMap;
    }))
    .subscribe((params:any)=>{
      this.category = params.get('category');
      this.filteredProducts= (this.category) ?
        this.products.filter(p=>p.data.category.toLowerCase()===this.category?.toLowerCase()):
        this.products;
    });
   }

  ngOnInit(): void {
  }

}
