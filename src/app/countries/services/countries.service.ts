import { Injectable } from '@angular/core';
import { Region } from '../interface/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _regions: Region[] = [
    Region.Africa,
    Region.America,
    Region.Asia,
    Region.Europa,
    Region.Oceania,
  ];
  constructor() {}

  get region(): Region[] {
    return [...this._regions];
  }
}
