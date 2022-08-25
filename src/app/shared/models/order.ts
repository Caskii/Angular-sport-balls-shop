import { ShoppingCart } from "./shopping-cart";

export class Order{
    date:number;
    items:any[];
    totalPrice:number;

    constructor(public userId:string, public userName:string,public sent:boolean, public address:any, cart:ShoppingCart){
        this.date=new Date().getTime();

        this.items = cart?.items.map(i=>{
            return {
              product:{
                title:i.product.title,
                imageUrl:i.product.imageUrl,
                price:i.product.price
              },
              quantity:i.quantity,
              totalPrice:i.totalPrice
            }
          })
      this.totalPrice=cart?.totalPrice;
    }
}