import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take,pipe,map, Observable } from 'rxjs';
import { Products } from '../models/products';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  
  private create(){
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  public async getCart(){
    let cartId =  await this.getOrCreateCartId();
    return this.db.object('shopping-carts/'+cartId).snapshotChanges();
  }
  public async getCartData(): Promise<Observable<any>>{
    let cartId =  await this.getOrCreateCartId();
    return this.db.object('shopping-carts/'+cartId).valueChanges();
  }
  public getItemRef(cartId:string,productId:string){
   return this.db.object('shopping-carts/'+cartId+'/items/'+productId);
  }

  private async getOrCreateCartId() {
    let cartId =localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    if(result.key){
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return null;
  }
  public async addToCart(product:Products){
    this.updateNumberOfProduct(product,1);
  }
  public async removeFromCart(product: Products) {
    this.updateNumberOfProduct(product,-1);
  }
  private async updateNumberOfProduct(product:Products,number:number){
    let cartId =  await this.getOrCreateCartId();
    if (!cartId) return null;
    let itemRef = this.getItemRef(cartId,product.key);
    itemRef.valueChanges().pipe(take(1)).subscribe((item:any)=>{
      if (item){
        let quantity =  item.quantity + number;
        if(quantity===0){
          itemRef.remove();
        }else{
          itemRef.update({quantity:quantity});
        }
      }else{
        itemRef.set({
          title:product.title,
          category:product.category,
          price:product.price,
          imageUrl:product.imageUrl,
          quantity:1
        });
      }
    })
    return true;
  }
 public async getTotalNumberOfProduct(){
    let cart$ = await this.getCartData();
    return cart$.pipe(map(cart=>{
      let total=0;
      for(let key in cart.items){
        total+=cart.items[key].quantity;
      }
      return total;
    }));
  }
}