import { Component, OnInit } from '@angular/core';
import { BrandService } from './brand.service';
import { IBrand } from '../../shared/models/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands: IBrand[];

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    return this.brandService.getBrands().subscribe(response => {
      this.brands = response;
      console.log(this.brands);
    }, error => {
      console.log(error);
    });
  }
}
