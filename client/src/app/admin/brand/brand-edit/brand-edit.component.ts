import { Component, OnInit, Input } from '@angular/core';
import { BrandFormVa, IBrand } from 'src/app/shared/models/brand';
import { BrandService } from '../brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnInit {
  brand: BrandFormVa;
  constructor(private route: ActivatedRoute, private brandService: BrandService,
              private router: Router, private toastr: ToastrService) { 
                this.brand = new BrandFormVa();
              }
              
  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'brand-edit'){
      this.loadBrand();
    }
    this.brand = new BrandFormVa();
  }

  loadBrand() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.brandService.getBrandById(id).subscribe((response: any) => {
      this.brand = {...response};
      console.log(this.brand);
    });
  }
}
