import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

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

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  //網頁載入時建構仔會先跑 然後跑ngOnInit (inject the service)
  constructor(private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {
    //customer shippingAddress這邊叫做formGroupName
    //底下的資料如customer的firestName叫做formControlName
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, 
                                      Validators.minLength(2)]),
        lastName: new FormControl('',[Validators.required, 
                                      Validators.minLength(2)]),
        email: new FormControl('',[Validators.required,
                                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      // customer: this.formBuilder.group({
      //   firstName: [''],
      //   lastName: [''],
      //   email: [''],
      // }),
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
    });
    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.luv2ShopFormService.getCreditMonths(startMonth).subscribe(
      data => {
        console.log("retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
    //populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
    //populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    )
  }
  //purchase button
  onSubmit() {
    console.log("Handling the submit button")
    // //touching all fields triggers , the display of the eoore messages
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value)
    console.log(this.checkoutFormGroup.get('billingAddress').value)
    console.log(this.checkoutFormGroup.get('creditCard').value)
    console.log(`email address is ` + this.checkoutFormGroup.get('customer').value.email)
  }
  //validator會用到的
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email')
  }

  //如果有勾起來的話 那麼就把shippingAddress的資料塞給billingAddress 取消勾選就reset
  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      //bug fix for states is not sync
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      //bug fix for states is not sync
      this.billingAddressStates = [];
    }
  }
  //處理如果選擇當年，前面已經過去的月份就要扣掉
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
    //if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.luv2ShopFormService.getCreditMonths(startMonth).subscribe(
      data => {
        console.log('retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string) {
    const FormGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = FormGroup.value.country.code;
    const countryName = FormGroup.value.country.name;
    console.log(`${formGroupName} country code: ${countryCode}`)
    console.log(`${formGroupName} country name: ${countryName}`)
    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === `shippingAddress`) {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        //select first item by default
        FormGroup.get('state').setValue(data[0]);
      }
    )
  }
}
