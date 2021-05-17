import { Component, OnInit } from '@angular/core';
import { BrandService } from './brand.service';
import { IBrand } from '../../shared/models/brand';
import { ShopParams } from '../../shared/models/ShopParams';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: IBrand[];
  shopParams: ShopParams;
  totalCount: number;
  constructor(private brandService: BrandService) { 
    this.shopParams = this.brandService.getShopParams();

  }

  ngOnInit(): void {
    this.getBrands(true);
  }
  getBrands(useCache = false) {
    this.brandService.getBrands(useCache).subscribe(res => {
      this.brands = res.data;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
  });
  }

  onPageChanged(event: any) {
    const params = this.brandService.getShopParams();
    if (params.pageNumber !== event)
    {
       params.pageNumber = event;
       this.brandService.setShopParams(params);
       this.getBrands(true);
    }
   }
   deleteBrand(id: number) {
    Swal.fire({
      title: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.brandService.deleteBrand(id).subscribe((response: any) => {
          this.brands.splice(this.brands.findIndex(p => p.id === id), 1);
        });
        Swal.fire(
          'Deleted!',
          'Brand has been deleted.',
          'success'
        );
      }
    });
  
  }
}
