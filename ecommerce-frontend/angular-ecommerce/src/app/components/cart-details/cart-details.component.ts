import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number =0;

  constructor(private cartService:CartService ) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    //subscribe to the cart totalQuantity
      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      )
    //compute cart total price and quantity
        this.cartService.computeCartTotals();

  }
  //與加入購物車共用一個方法
  increamentQuantity(theCartItem: CartItem){
    this.cartService.addToCart(theCartItem)
  }
  // 減少品項數量
  decreamentQuantity(theCartItem: CartItem){
    this.cartService.decreamentQuantity(theCartItem)
  }

  // 移除按鈕
  remove(thCartItem: CartItem){
    this.cartService.remove(thCartItem)
  }
}
