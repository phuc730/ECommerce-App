import { Component,Input, OnInit } from '@angular/core';
import { BrandFormVa, IBrand } from 'src/app/shared/models/brand';
import { BrandService } from '../brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-band-form',
  templateUrl: './band-form.component.html',
  styleUrls: ['./band-form.component.scss']
})
export class BandFormComponent implements OnInit {
  @Input() brandForm: BrandFormVa;
  brand : BrandFormVa;
  public typeId : number =parseInt(this.route.snapshot.paramMap.get('id')) ;
  constructor(private route: ActivatedRoute, private brandService: BrandService,
    private router: Router, private toastr: ToastrService,) { 
    }

  ngOnInit(): void {
  }

  onSubmit(data: BrandFormVa) {
    console.log(data);
    if (this.route.snapshot.url[0].path === 'brand-edit') {

      this.brandService.updateBrand(parseInt(this.route.snapshot.paramMap.get('id')!),data).subscribe((response: any) => {
        this.router.navigate(['/admin/brand']);
        this.toastr.success('Update brand successful');
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    } else {
      this.brandService.createBrand(data).subscribe((response: any) => {
        this.router.navigate(['/admin/brand']);
        this.toastr.success('Create brand successful');
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    }
  }

}
