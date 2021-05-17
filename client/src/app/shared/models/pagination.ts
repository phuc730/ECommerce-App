import { IProduct } from "./product";
import {IUser} from "./user";
import {IType} from './productType'
import {IBrand} from './brand'
export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IProduct[];
  }

export class Pagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IProduct[] = [];
}

export interface IPaginationUser {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IUser[];
}

export class PaginationUser implements IPaginationUser {
pageIndex: number;
pageSize: number;
count: number;
data: IUser[] = [];
}

export interface IPaginationType {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IType[];
}

export class PaginationType implements IPaginationType {
pageIndex: number;
pageSize: number;
count: number;
data: IType[] = [];
}

export interface IPaginationBrand{
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IBrand[];
}

export class PaginationBrand implements IPaginationBrand {
pageIndex: number;
pageSize: number;
count: number;
data: IBrand[] = [];
}