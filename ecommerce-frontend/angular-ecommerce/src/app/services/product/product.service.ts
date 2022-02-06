import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //這邊本來把網址改成'http://localhost:8080/api/products?size=100' 導致網址壞掉
  private baseUrl = 'http://localhost:8080/api/products';

  private categeryUrl = 'http://localhost:8080/api/product-category'

  constructor(private httpClient: HttpClient) { }

  getProductListsPaginate(thePage: number,
                          thePageSize: number,
                          theCategoryId: number): Observable<GetResponseProducts>{
    console.log("getProductLists : " + theCategoryId);
    //need to build URL based on caregory id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;
    //we
    console.log("getProductLists : " + searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    }


  getProductLists(theCategoryId: number): Observable<Product[]>{
    console.log("getProductLists : " + theCategoryId);
    //need to build URL based on caregory id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    //we
    console.log("getProductLists : " + searchUrl);
    return this.getProducts(searchUrl);
    }

    //設定為Observable
    //使用可觀察物件（Observable）來傳遞值
    //作為發佈者，你建立一個 Observable 的實例，其中定義了一個訂閱者（subscriber）函式。
    //當有消費者呼叫 subscribe() 方法時，這個函式就會執行。
    //訂閱者函式用於定義“如何獲取或產生那些要發佈的值或訊息”。
    //httpClient
    //大多數前端應用都要透過 HTTP 協議與伺服器通訊，才能下載或上傳資料並訪問其它後端服務。
    //Angular 給應用提供了一個 HTTP 客戶端 API，也就是 @angular/common/http 中的 HttpClient 服務類別。
    //要使用時 要先在建構子中宣告注入
    //get
    //使用 HttpClient.get() 方法從伺服器獲取資料。該非同步方法會發送一個 HTTP 請求，
    //並返回一個 Observable，它會在收到響應時發出所請求到的資料。
    //返回的型別取決於你呼叫時傳入的 observe 和 responseType 引數。
    //response => response._embedded.productCategory不是很董
    //我們可以訂閱subscribe這個 observable，來接收他送出的值，程式碼如下
    getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categeryUrl).pipe(
      map(response => response._embedded.productCategory)
      );
    }

    searchProducts(theKeyword: string): Observable<Product[]> {
    //need to build URL based on caregory id  findByNameContaining跟ProductRepository中的方法名稱一樣
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    //we
    console.log("searchProducts : " + searchUrl);
    //原本方法寫得很長 但重複使用 所以我們選取該區域 然後右鍵refactor選擇extract method to (thisclass)
    return this.getProducts(searchUrl);
    }


    searchProductPaginate(thePage: number,
                          thePageSize: number,
                          theKeyword: string): Observable<GetResponseProducts>{

      //need to build URL based on keyword
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;
      //we
      console.log("getProductLists : " + searchUrl);
      return this.httpClient.get<GetResponseProducts>(searchUrl);
      }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProduct(theProductId: number): Observable<Product> {
    //need to build URL based on product id
    //it it means http://localhost:8080/api/products/1 ??
    const productURL = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productURL);
  }



  }
  //右鍵 rename symble改成GetResponseProducts
interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
// we'll use this GetResponseProductCategory for calling REST API
//unwraps the JSON form Spring Data REST _enbedded entry
//可以在service裡面放一堆interface 來接收傳回來的JSON資料?
interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
