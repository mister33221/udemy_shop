import { TokenStorageService } from './../../services/tokenStorage/token-storage.service';
import { AuthService } from './../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  isLoggedInTest = false;
  isLoginFailedTest = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.updateLoggedStatus();
  }

  updateCartStatus() {

    //subscribe to thee cart total price
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    //subscribe to the cart totalQuaantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  updateLoggedStatus() {

    //subscribe to thee cart total price
    this.tokenStorageService.isLoggedInTest.subscribe(
      data => this.isLoggedInTest = data
    )
    //subscribe to the cart totalQuaantity
    this.tokenStorageService.isLoginFailedTest.subscribe(
      data => this.isLoginFailedTest = data
    )
  }

  toCartDetail(){
    if(this.isLoggedInTest){
      this.router.navigate(["/cart-details"], {relativeTo: this.activatedRoute})
    }else{
      this.router.navigate(["/login"], {relativeTo: this.activatedRoute})
    }
  }


}
