import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
   title = 'My View - Store';
   isAdmin$: Observable<boolean>;
   constructor(private basketService: BasketService, private accountService: AccountService) {}

   ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
    this.isAdmin$ = this.accountService.isAdmin$;
   }

   loadCurrentUser() {
     const token = localStorage.getItem('token');
     this.accountService.loadCurrentUser(token).subscribe(() => {
      }, (err) => console.log(err));
   }

   loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
       }, error => console.log(error));
    }
   }
}
