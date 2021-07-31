import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  //他的範例沒有undefined
  //需要初始化或宣告undefine
  productCategories: ProductCategory[] | undefined;
  //建構子放了其他的component(service)給下面使用
  constructor(private productService: ProductService) { }

  //他的範例都沒有void
  //當 Angular 實例化元件類別並渲染元件檢視及其子檢視時，元件實例的生命週期就開始了。
  //生命週期一直伴隨著變更檢測，Angular 會檢查資料繫結屬性何時發生變化，並按需更新檢視和元件實例。
  //當 Angular 銷燬元件實例並從 DOM 中移除它渲染的範本時，生命週期就結束了。
  //每個介面都有唯一的一個鉤子方法，它們的名字是由介面名再加上 ng 字首構成的。
  //比如，OnInit 介面的鉤子方法叫做 ngOnInit()。
  //如果你在元件或指令類別中實現了這個方法，Angular 就會在首次檢查完元件或指令的輸入屬性後，緊接著呼叫它。
  //一載入就會呼叫的方法
  ngOnInit(): void {
    this.listProductCategories()
  }
  //作為發佈者，你建立一個 Observable 的實例，其中定義了一個訂閱者（subscriber）函式。 
  //當有消費者呼叫 subscribe() 方法時，這個函式就會執行。 
  //訂閱者函式用於定義“如何獲取或產生那些要發佈的值或訊息”。
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      //他只寫data 又沒有宣告屬性 我又是自己加的
      ( data: ProductCategory[] | undefined) => {
        console.log('Product CateGories = ' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
