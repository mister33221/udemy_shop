import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
//這邊宣告的property就可以直接在HTML裡用{{ }}取得
  totalPrice: number = 0;
  totalQuantity: number = 0;

  //網頁載入時建構仔會先跑 然後跑ngOnInit
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //customer shippingAddress這邊叫做formGroupName
    //底下的資料如customer的firestName叫做formControlName
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        CardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    })
  }
//purchase button
onSubmit(){
  console.log("Handling the submit button")
  console.log(this.checkoutFormGroup.get('customer').value)
  console.log(this.checkoutFormGroup.get('billingAddress').value)
  console.log(this.checkoutFormGroup.get('creditCard').value)
  console.log(`email address is ` + this.checkoutFormGroup.get('customer').value.email)
}
//如果有勾起來的話 那麼就把shippingAddress的資料塞給billingAddress 取消勾選就reset
copyShippingAddressToBillingAddress(event){
  if(event.target.checked){
    this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
  }else{
    this.checkoutFormGroup.controls.billingAddress.reset();
  }
}

}
