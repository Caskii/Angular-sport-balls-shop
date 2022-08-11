import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  categories: Categories[] | undefined;

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router
    ) {
    categoryService.getCategories().subscribe((categories:any) => this.categories=categories);
   }

  ngOnInit(): void {
  }

  save(product:any){
    this.productService.create(product)
    this.router.navigate(['/admin/produits']);
  }
}
