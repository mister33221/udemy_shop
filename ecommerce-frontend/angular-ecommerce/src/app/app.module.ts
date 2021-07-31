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

//when path matches, create new instance of componenet順序性有意義 會從第一個開始找
const routes: Routes = [
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
    ProductDetailsComponent
  ],
  imports: [
    //上面搬下來的
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    //exposes the exported declarations in NgbNodule(classes, interface, constants etc)
    //and makes them avaliable in the current module.
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
