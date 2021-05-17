import { Component, OnInit, Input } from '@angular/core';
import { TypeFormVa, IType } from 'src/app/shared/models/productType';
import { TypeService } from '../type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnInit {
  @Input() typeForm: TypeFormVa;
  type : TypeFormVa;
  types: IType[] ;
  public typeId : number =parseInt(this.route.snapshot.paramMap.get('id')) ;
  constructor(private route: ActivatedRoute, private typeService: TypeService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  
  onSubmit(data: TypeFormVa) {
    console.log(this.typeForm);
    if (this.route.snapshot.url[0].path === 'type-edit') {

      this.typeService.updateType(this.route.snapshot.paramMap.get('id')!,data).subscribe((response: any) => {
        this.router.navigate(['/admin/type']);
        this.toastr.success('Update type successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    } else {
      this.typeService.createType(data).subscribe((response: any) => {
        this.router.navigate(['/admin/type']);
        this.toastr.success('Create type successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    }
  }

}
