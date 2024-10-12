import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interface/country.interfaces';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
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
    return this.http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      ),
      tap((resp) => console.log({ resp }))
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    console.log({alphaCode});

    const url = `${this.baseUrl}alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))
    );
  }

  getCountryBordersByCodes(borders: string[]): Observable<SmallCountry[]>{
    if(!borders || borders.length === 0) return of([]);
    const countryRequest: Observable<SmallCountry>[] = [];
    borders.forEach(code=>{
      const request = this.getCountryByAlphaCode(code);
      countryRequest.push(request);

    });
    return combineLatest(countryRequest);
  }
}
