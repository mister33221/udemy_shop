import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //rxjs: reactive javascript
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries'
  private stateUrl = 'http://localhost:8080/api/states'

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]>{

    //search url
    const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`
    return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
      map(response => response._embedded.states)
    )
  }

  getCreditMonths(startMonth: number): Observable<number[]>{
    let data: number[] = [];
    //build an array for Month dropdown list
    // - start at current month and loop unit
    for(let theMonth = startMonth; theMonth <= 12; theMonth++){
      data.push(theMonth);
    }
    return of(data); //the 'of' operator form rxjs, will wrap an object as an Observable
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];
    //build an array for "year" downlist
    //-startat current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }
    return of(data);
  }

}
//宣告在最外面  171
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}
interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}