import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { IUser, IUser1 } from '../../shared/models/user';
import { ShopParams } from '../../shared/models/ShopParams';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: IUser[];
  totalCount: number;
  shopParams: ShopParams;
  user: IUser1;
  constructor(private userService: UserService) {
    this.shopParams = this.userService.getShopParams();
   }

  ngOnInit(): void {
    this.getUsers(true);
    }
  getUsers(useCache = false) {
    this.userService.getUsers(useCache).subscribe(res => {
      this.users = res.data;
      this.totalCount = res.count;
    }, error => {
      console.log(error);
  });
}

onPageChanged(event: any) {
  const params = this.userService.getShopParams();
  if (params.pageNumber !== event)
  {
     params.pageNumber = event;
     this.userService.setShopParams(params);
     this.getUsers(true);
  }
 }

 getRolesOfUser(email : string) {
  return this.userService.getRolesOfUser(email);
}

deleteUser(id: string) {
  Swal.fire({
    title: 'Do you want to really delete ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      this.userService.deleteUser(id).subscribe((response: any) => {
        this.users.splice(this.users.findIndex(p => p.email === id), 1);
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
