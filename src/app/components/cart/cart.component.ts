import { Component, ElementRef, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalCartAmount: number = 0;
  user: User = new User();
  isUserLoggedIn: boolean = false;
  authenticationMode: string = 'sign-in';

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalCartAmount = this.cartService.getTotalAmount();

    this.userUpdated();
  }

  userUpdated(): void {
    this.isUserLoggedIn = this.userService.isUserLoggedIn();
    this.user = this.userService.getUser();
  }

  removeCartItem(cartItem: CartItem): void {
    this.cartService.removeProductItem(cartItem);
    this.cartItems = this.cartService.getCartItems();
    this.totalCartAmount = this.cartService.getTotalAmount();
    this.cartUpdated();
  }

  updateCartQuantity(): void {
    this.cartService.updateCart();
    this.totalCartAmount = this.cartService.getTotalAmount();
    this.cartUpdated();
  }

  cartUpdated(): void {
    this.el.nativeElement.dispatchEvent(
      new CustomEvent('cart-updated', {
        bubbles: true
      })
    );
  }
}
