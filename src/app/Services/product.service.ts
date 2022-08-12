import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }
  getall(){
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(p => {
        const key = p.payload.key;
        const data = p.payload.val();
        return {key,data};
      });
     }));
  }
  get(productId:string){
    return this.db.object('/products/'+productId).valueChanges();
  }
  update(productId:string,product:Products){
    this.db.object('/products/'+productId).update(product);
  }
  delete(productId:string){
    this.db.object('/products/'+productId).remove();
  }
}
