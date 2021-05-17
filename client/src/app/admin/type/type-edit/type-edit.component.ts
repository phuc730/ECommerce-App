import { Component, OnInit, Input } from '@angular/core';
import { TypeService } from '../type.service';
import { ToastrService } from 'ngx-toastr';
import { IType, TypeFormVa } from 'src/app/shared/models/productType';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent implements OnInit {
  type: TypeFormVa;
  constructor(private route: ActivatedRoute, private typeService: TypeService,
    private toastr: ToastrService,  private router: Router,) {
      this.type = new TypeFormVa();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'type-edit'){
      this.loadType();
    }
    this.type = new TypeFormVa();
  }

  loadType() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.typeService.getTypeById(id).subscribe((response: any) => {
      this.type = {...response};
      console.log(this.type);
    });
  }

  

}
