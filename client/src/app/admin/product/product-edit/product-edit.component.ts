import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct, ProductFormVa } from 'src/app/shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import {IType} from 'src/app/shared/models/productType';
import {IBrand} from 'src/app/shared/models/brand';
import {ShopService} from '../../../shop/shop.service'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  
  fileUpload : File = null;
  product : ProductFormVa;
  brands: IBrand[];
  types: IType[];
  constructor(private productService : ProductService,private route: ActivatedRoute,
    private toastr: ToastrService,  private router: Router,private shopService: ShopService) {
      this.product = new ProductFormVa();
     }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'product-edit'){
      this.loadType();
    }

  }
  loadType() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.productService.getProductById(id).subscribe((response: any) => {
      const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand)!.id;
      const productTypeId = this.types && this.types.find(x => x.name === response.productType)!.id;
      // this.product = {...response};
      this.product = {...response, productBrandId, productTypeId};
      console.log(this.product);
    });
  }

 

  onSubmit(){
    this.productService.postFile(this.fileUpload).subscribe(
      data => {
        console.log('done');
      }
    );
  }


}
