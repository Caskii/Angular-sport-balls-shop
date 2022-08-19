import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
    itemsList:ShoppingCartItem[]=[];

    constructor(private itemsJson:any){
        for(let itemID in itemsJson){
            this.itemsList.push(new ShoppingCartItem({
                'key':itemID,
                'category':itemsJson[itemID].category,
                'imageUrl':itemsJson[itemID].imageUrl,
                'price':itemsJson[itemID].price,
                'title':itemsJson[itemID].title
            },itemsJson[itemID].quantity));
        }
    }
    public getQuantity(productId:string){
        let item=this.itemsJson[productId];
        return item ? item.quantity : 0;
    }

    get totalItemsCount(){
        let count=0;
        this.itemsList.forEach( item=>count+= item.quantity);
        return count;
    }

    get items(){
        return this.itemsList;
    }

    get totalPrice(){
        let total=0;
        this.itemsList.forEach(item => total += item.totalPrice);
        return total;
    }

    isEmpty():boolean{
        if(this.itemsList.length==0) return true
        return false;
    }
    
}