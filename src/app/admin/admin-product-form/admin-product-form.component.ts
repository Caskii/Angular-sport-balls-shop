import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Products } from 'shared/models/products';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product:Products={} as Products;
  id:string|null;

  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route: ActivatedRoute
    ) {
      this.categories$=categoryService.getall();
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id){
        this.productService.get(this.id).pipe(take(1)).subscribe((p:any) => this.product=p)
      }
  }

  ngOnInit(): void {
  }

  save(product:Products){
    if (this.id){
      this.productService.update(this.id, product)
    }else{
      this.productService.create(product)
    }
    this.router.navigate(['/admin/produits']);
  }
  delete(){
    if(this.id){
      if(confirm('Voulez-vous vraiment supprimer ce produit ?')){
        this.productService.delete(this.id)
        this.router.navigate(['/admin/produits']);
      }
    }
  }
}
