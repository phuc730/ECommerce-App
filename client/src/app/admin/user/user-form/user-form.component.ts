import { Component, OnInit, Input } from '@angular/core';
import { UserFormVa, IUser } from 'src/app/shared/models/user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRole } from 'src/app/shared/models/role';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() userForm: UserFormVa;
  user : UserFormVa;
  users: IUser[] ;
  rolesOfUser: IRole[];
  public typeId : string =this.route.snapshot.url[0].path ;
  public email: string = this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router, private toastr: ToastrService) {
     }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'user-edit'){
      this.getRolesOfUser();
    }
  }
  getRolesOfUser() {
    const id = this.route.snapshot.paramMap.get('id') || "";
    return  this.userService.getRolesOfUser(id).subscribe(res => {
      this.rolesOfUser = res;
      console.log(this.rolesOfUser);
    }, error => {
      console.log(error);
  });
  }
  onSubmit(data: UserFormVa) {
    console.log(this.userForm);
    if (this.route.snapshot.url[0].path === 'user-edit') {

      this.userService.updateUser(data).subscribe((response: any) => {
        this.router.navigate(['/admin/user']);
        this.toastr.success('Update User successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    } else {
      this.userService.createUser(data).subscribe((response: any) => {
        this.router.navigate(['/admin/user']);
        this.toastr.success('Create User successful');
        
      }, error => {
        this.toastr.error(error.message);
        console.log(error);
      });
    }
  }

}
