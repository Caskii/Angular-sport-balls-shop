import { Products } from "./products";

export class ShoppingCartItem{
    public product:Products;
    public quantity:number;

    constructor(product:Products,quantity:number){
        this.product=product;
        this.quantity=quantity;
    }
    get totalPrice(){
        return this.product.price*this.quantity;
    }
}