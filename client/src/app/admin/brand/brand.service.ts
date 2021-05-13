import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBrand } from '../../shared/models/brand';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.apiUrl;
  brands: IBrand[] = [];
  constructor(private http: HttpClient) { }

  getBrands(){
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(response => {
        this.brands = response;
        return response;
      })
    );
  }
}
