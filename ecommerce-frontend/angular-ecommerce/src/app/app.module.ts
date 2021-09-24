import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

//when path matches, create new instance of componenet順序性有意義 會從第一個開始找
//在 Routes 陣列中定義你的路由，這個陣列中的每個陸游都是一個包含兩個屬性的JavaScript物件，
//第一個屬性path定義了該路油的URL路徑
//第二個屬性component定義了要讓Angular當作相應路徑的元件
//而有了routes的定義後，就可以把它應用在html中。把要新增陸游的連結賦值給routerLink屬性，使用這點選時就會連結到該元件  
//ex:  <a routerLink="/first-component" routerLinkActive="active">First Component</a>
//而<router-outlet> 標籤。該元素會通知 Angular，你可以用所選路由的元件更新應用的檢視。
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo:'/products', pathMatch:'full'},
  {path: '**', redirectTo:'/products', pathMatch:'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    //要在這邊註冊好 才能在html中使用他的tag!
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent
  ],
  imports: [
    //上面搬下來的
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    //exposes the exported declarations in NgbNodule(classes, interface, constants etc)
    //and makes them avaliable in the current module.
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
