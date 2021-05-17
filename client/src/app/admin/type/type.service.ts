import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IType } from '../../shared/models/productType';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ShopParams } from '../../shared/models/ShopParams';
import { IPaginationType, PaginationType } from '../../shared/models/pagination';
@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl = environment.apiUrl;
  types: IType[] = [];
  pagination = new PaginationType();
  shopParams = new ShopParams();
  constructor(private http: HttpClient) { }

  getTypes(useCache: boolean) {

    if (useCache === false) {
      this.types = [];
    }

    if (this.types.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.types.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.types.slice((this.shopParams.pageNumber - 1) *
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

    return this.http.get<IPaginationType>(this.baseUrl + 'types', {observe: 'response', params})
      .pipe(
        map(response => {
          // Filled array once all products loaded
          // will append the new set of data with existing set
          this.types = [...this.types, ...response.body.data];
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

  getTypeById(id: string){
    return this.http.get<IType>(this.baseUrl + 'types/' + id);

  }
  createType( data: IType) {
    return this.http.post(this.baseUrl + 'types', data);
  }
  updateType(id: string, data: IType) {
    return this.http.put(this.baseUrl + 'types/' + id, data);
  }
  deleteType(id: number) {
    return this.http.delete(this.baseUrl + 'types/' + id);
  }
}
