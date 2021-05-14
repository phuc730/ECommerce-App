import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopParams } from '../../shared/models/ShopParams';
import { IPagination, Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();
  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean) {

    if (useCache === false) {
      this.products = [];
    }

    if (this.products.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.products.slice((this.shopParams.pageNumber - 1) *
        this.shopParams.pageSize, this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }
    let params = new HttpParams();

    if (this.shopParams.brandId !== 0) {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== 0) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageIndex', this.shopParams.pageSize.toString());

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          // Filled array once all products loaded
          // will append the new set of data with existing set
          this.products = [...this.products, ...response.body.data];
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

  postFile(fileUpload : File){
    const endpoint = this.baseUrl + 'image';
    const formData = new FormData();
    formData.append('assets/images',fileUpload);
    return this.http.post(endpoint,formData);
  }
}
