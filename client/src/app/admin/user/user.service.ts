import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser, IUser1 } from '../../shared/models/user';
import { IRole } from '../../shared/models/role';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of,ReplaySubject } from 'rxjs';
import { ShopParams } from '../../shared/models/ShopParams';
import { IPagination, IPaginationUser, Pagination, PaginationUser } from '../../shared/models/pagination';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSource = new ReplaySubject<IUser>(1);
  baseUrl = environment.apiUrl;
  users: IUser[] = [];
  users1: IUser1[]=[];
  pagination = new PaginationUser();
  shopParams = new ShopParams();
  rolesOfUser: IRole[];
  constructor(private http: HttpClient) { }

  getUsers(useCache: boolean){
    if (useCache === false) {
      this.users = [];
    }

    if (this.users.length > 0 && useCache === true) {
      const pagesReceived = Math.ceil(this.users.length / this.shopParams.pageSize);

      if (this.shopParams.pageNumber <= pagesReceived) {
        this.pagination.data = this.users.slice((this.shopParams.pageNumber - 1) *
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

    return this.http.get<IPaginationUser>(this.baseUrl + 'account/user', {observe: 'response', params})
      .pipe(
        map(response => {
          // Filled array once all products loaded
          // will append the new set of data with existing set
          this.users = [...this.users, ...response.body.data];
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

  createUser(data: IUser1) {
    return this.http.post(this.baseUrl + 'account/createUser', data);
  }
  updateUser(data: IUser1) {
    return this.http.put(this.baseUrl + 'account/updateUser', data);
  }
  deleteUser(email: string) {
    return this.http.delete(this.baseUrl + 'account/' + email);
  }
  getUser(id: string){
    const user = this.users1?.find(p => p.email === id);
    if (user)
    {
      return of(user);
    }
    return this.http.get<IUser1>(this.baseUrl + 'account/' + id);
  }

  getRolesOfUser(id: string){
    return this.http.get<IRole[]>(this.baseUrl + 'account/' + id + '/roles').pipe(
      map(response => {
        this.rolesOfUser = response;
        return response;
      })
    );
  }
}
