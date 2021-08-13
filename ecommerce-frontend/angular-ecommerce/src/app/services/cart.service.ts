import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem){
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;   //要寫undefined+! 不然會跳錯

    if(this.cartItems.length > 0){
    //find the item intehe cart based on item id
    //我把tsconfig.json中的"strict": true,改成false 不然這邊我existingCartItem上面宣告成undefined 下面這條會跳錯
      existingCartItem = this.cartItems.find(tempCarItem => tempCarItem.id === theCartItem.id)
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    
    if(alreadyExistsInCart){
      //increment the quantity
      existingCartItem.quantity++;
    }else{
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //public the new values ... all subscrubers will recive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue)
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for(let tempCartItem of this.cartItems){
      console.log(`name : ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice = ${tempCartItem.unitPrice}`)
    }
  
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log(`-------------------`);
  }
}
