import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

//ERROR TypeError: ctx.product is undefined
//ProductDetailsComponent_Template product-details.component.html:4
// product!: Product;
product: Product =  new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    //get the id param string. convert string to number using the "+" symbol
    //我自己家的驚嘆號
    const theProductId: number = +(this.route.snapshot.paramMap.get('id'))!;

    this.productService.getProduct(theProductId).subscribe(
      data =>{
        this.product = data;
      }
    )
  }
  addToCart(){
    console.log(`Adding to cart : ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
