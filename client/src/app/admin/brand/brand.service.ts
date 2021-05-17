import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBrand } from '../../shared/models/brand';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopParams } from '../../shared/models/ShopParams';
import { IPaginationBrand, PaginationBrand } from '../../shared/models/pagination';
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseUrl = environment.apiUrl;
  brands: IBrand[] = [];
  pagination = new PaginationBrand();
  shopParams = new ShopParams();
  constructor(private http: HttpClient) { }

  getBrands(useCache: boolean){
    if (useCache === false) {
      this.brands = [];
    }

    if (this.brands.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.brands.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.brands.slice((this.shopParams.pageNumber - 1) *
        this.shopParams.pageSize, this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }
    let params = new HttpParams();

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageIndex', this.shopParams.pageSize.toString());

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    return this.http.get<IPaginationBrand>(this.baseUrl + 'brands', {observe: 'response', params})
      .pipe(
        map(response => {
          // Filled array once all products loaded
          // will append the new set of data with existing set
          this.brands = [...this.brands, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }
  deleteBrand(id: number) {
    return this.http.delete(this.baseUrl + 'brands/' + id);
  }
  createBrand(brand : IBrand){
    return this.http.post(this.baseUrl + 'brands', brand);
  }

  updateBrand(id: number, brand: IBrand) {
    return this.http.put(this.baseUrl + 'brands/' + id, brand);
  }

  getBrandById(id: string){
    return this.http.get<IBrand>(this.baseUrl + 'brands/' + id);

  }
}
