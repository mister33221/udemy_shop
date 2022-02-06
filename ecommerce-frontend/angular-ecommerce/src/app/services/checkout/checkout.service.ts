import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{
    console.log("purchaaseUrl")
    console.log(purchase.shippingAddress.state)
    console.log(purchase.shippingAddress.country)
    console.log(purchase.shippingAddress.zipCode)
    return this.httpClient.post<Purchase>(this.purchaseUrl,  purchase);
  }
}
