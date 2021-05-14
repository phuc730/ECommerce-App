import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/ShopParams';
import {ProductService} from './product.service'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: IProduct[];
  shopParams: ShopParams;
  totalCount: number;
  constructor(private productService : ProductService) { 
    this.shopParams = this.productService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
  }
  getProducts(useCache = false) {
    this.productService.getProducts(useCache).subscribe(res => {
      this.products = res.data;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
  });
}

onPageChanged(event: any) {
  const params = this.productService.getShopParams();
  if (params.pageNumber !== event)
  {
     params.pageNumber = event;
     this.productService.setShopParams(params);
     this.getProducts(true);
  }
 }
}
