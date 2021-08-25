import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2shopValidators } from 'src/app/validators/luv2shop-validators';

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
        firstName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      // customer: this.formBuilder.group({
      //   firstName: [''],
      //   lastName: [''],
      //   email: [''],
      // }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required,
        Validators.minLength(2),
        Luv2shopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required,
        Validators.pattern('[0-9{16}]')]),
        securityCode: new FormControl('', [Validators.required,
        Validators.pattern('[0-9{3}]')]),
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
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value)
    console.log(this.checkoutFormGroup.get('billingAddress').value)
    console.log(this.checkoutFormGroup.get('creditCard').value)
    console.log(`email address is ` + this.checkoutFormGroup.get('customer').value.email)
  }
  //validator會用到的???
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
    console.log("get first");
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email')
  }
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street')
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city')
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state')
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode')
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country')
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street')
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city')
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state')
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode')
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country')
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType')
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard')
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber')
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode')
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
