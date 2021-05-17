import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { IUser1, UserFormVa } from 'src/app/shared/models/user';
import { IRole } from 'src/app/shared/models/role';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: UserFormVa;
  rolesOfUser: IRole[];

  constructor(private route: ActivatedRoute, private userService: UserService,
    private toastr: ToastrService,  private router: Router,) {
      this.user = new UserFormVa();
     }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'user-edit'){
      this.loadUser();
      const rolesOfUser = this.getRolesOfUser();
    }
    this.user = new UserFormVa();
  }
  loadUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    this.userService.getUser(id).subscribe((response: any) => {
      // this.user = response;
      this.user = {...response};
      console.log(this.route.snapshot.paramMap.get('id'));
    });
  }

  getRolesOfUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    return this.userService.getRolesOfUser(id);
  }
}
