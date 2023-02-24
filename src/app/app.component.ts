import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-store';
  totalCartQuantity: number = 0;
  userIsLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.cartUpdated();
    this.userIsLoggedIn = this.userService.isUserLoggedIn();
  }

  cartUpdated(): void {
    this.totalCartQuantity = this.cartService.getTotalQuantity();
  }

  userLoggedIn(): void {
    this.userIsLoggedIn = this.userService.isUserLoggedIn();
  }

  userLoggedOut(): void {
    const spinnerName = 'signout-spinner';

    this.spinner.show(spinnerName);

    setTimeout(() => {
      this.spinner.hide(spinnerName);
      this.orderService.clearPlacedOrder();
      this.userService.logout();
      this.userIsLoggedIn = this.userService.isUserLoggedIn();
    }, 1000);
  }
}
