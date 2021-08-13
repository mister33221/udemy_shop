import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //沒有初始化
  // products: Product[] | undefined;
  // currentCategoryId: number | undefined;
  // previousCategoryId: number | undefined;
  // searchMode: boolean | undefined;
  //沒有初始化
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 20;
  theTotalElements: number = 0;

  //他本來寫 = null 但String不能指定為null
  previousKeyword: string = "";


  //inject the activatedRoute
  //the current acive route that loaded the component. useful for accessing route parameters
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if(this.searchMode){
      this.handleSearchtProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchtProducts(){
    //加了一個驚嘆號的意思?? 在給型別 但還沒賦值之前 先給他的未確認的意思嗎 
    //from my understanding, u just force the compiler to believe that the constant is impossible to be null.
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //if we have  a different keyword than previous
    //then set thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)
    
    //now search for the product using keyword
    this.productService.searchProductPaginate(this.thePageNumber -1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
    //check if "id" parameter is avaliable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
      if (hasCategoryId) {
        //我自己加了number(   ) 否則他會顯示Object is possibly Null
        this.currentCategoryId = +Number(this.route.snapshot.paramMap.get("id"));
      } else{
        //not catagory id avaliable ... default to category id = 1
        this.currentCategoryId = 1;
      }
          
      //check if we have a different category than previous
      //note: angular will reuse a component if it is currently being viewed
      //if we have a different category id than previous
      //then set thePageNumber back to 1
      if (this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;
      console.log(`currentCategoryId = ${this.currentCategoryId}, thePageNumber = ${this.thePageNumber}`);

      console.log("listProducts : " + this.route.snapshot.paramMap.get("id"));
      this.productService.getProductListsPaginate(this.thePageNumber-1,
                                                  this.thePageSize,
                                                  this.currentCategoryId)
                                                  .subscribe(this.processResult());
  }

  processResult(){
  //他是只有data而已
  return ((data: { _embedded: { products: Product[]; }; page: { number: number; size: number; totalElements: number; }; }) => 
    {
      this.products = data._embedded.products;
      //spring data REST: pages are 0 based
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  )}

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

addToCart(theProduct: Product){
  console.log(`Adding to cart : ${theProduct.name}, ${theProduct.unitPrice}  `)

  //TODO ... do the real work
  const theCartItem = new CartItem(theProduct)

  this.cartService.addToCart(theCartItem)

}  


}


