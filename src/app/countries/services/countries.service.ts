import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interface/country.interfaces';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1/';
  private _regions: Region[] = [
    Region.Africa,
    Region.America,
    Region.Asia,
    Region.Europa,
    Region.Oceania,
  ];

  constructor(private http: HttpClient) {}

  get region(): Region[] {
    return [...this._regions];
  }

  getCountriesByregion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url: string = `${this.baseUrl}region/${region}?fields=cca3,name,borders`;
    return this.http
      .get<SmallCountry[]>(url)
      .pipe(tap(resp => console.log({resp})));
  }
}
