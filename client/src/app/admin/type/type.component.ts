import { Component, OnInit } from '@angular/core';
import { TypeService } from './type.service';
import { IType } from '../../shared/models/productType';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ShopParams } from '../../shared/models/ShopParams';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  types: IType[];
  totalCount: number;
  shopParams: ShopParams;
  constructor(private typeService: TypeService, private fb: FormBuilder) { 
    this.shopParams = this.typeService.getShopParams();
  }
  ngOnInit(): void {
    this.getTypes(true);
  }

  getTypes(useCache = false) {
    this.typeService.getTypes(useCache).subscribe(res => {
      this.types = res.data;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
  });
}

onPageChanged(event: any) {
  const params = this.typeService.getShopParams();
  if (params.pageNumber !== event)
  {
     params.pageNumber = event;
     this.typeService.setShopParams(params);
     this.getTypes(true);
  }
 }
  deleteType(id: number) {
    Swal.fire({
      title: 'Do you want to really delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.typeService.deleteType(id).subscribe((response: any) => {
          this.types.splice(this.types.findIndex(p => p.id === id), 1);
        });
        Swal.fire(
          'Deleted!',
          'Type Product has been deleted.',
          'success'
        );
      }
    });

  }
}
