import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CART_STORAGE_KEY = 'CART_STORAGE_KEY';
  private cartItems: CartItem[] = [];

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
    if (this.storage.has(this.CART_STORAGE_KEY)) {
      this.cartItems = this.storage.get(this.CART_STORAGE_KEY);
    }
  }

  addProductToCart(p: Product, q: number): void {
    const productId = p.id;

    // check if product is already exist in cart
    let productInCart;
    for (let index = 0; index < this.cartItems.length; index++) {
      const cartItem = this.cartItems[index];

      if (cartItem.product.id === productId) {
        productInCart = cartItem;
        break;
      }
    }

    if (productInCart) {
      // update its quantity if product already exisits
      productInCart.quantity += q;
    } else {
      // add a new cart item if product NOT exisits

      const newCartItem = new CartItem();
      newCartItem.product = p;
      newCartItem.quantity = q;
      this.cartItems.push(newCartItem);
    }

    this.storage.set(this.CART_STORAGE_KEY, this.cartItems);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  removeProductItem(item: CartItem): void {
    this.cartItems = this.getCartItems().filter(
      cartItem => cartItem.product.id !== item.product.id
    );

    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  updateCart(): void {
    this.storage.set(this.CART_STORAGE_KEY, this.cartItems);
  }

  getTotalQuantity(): number {
    let totalQuantityInCart: number = 0;

    const cartItems = this.getCartItems();

    for (let index = 0; index < cartItems.length; index++) {
      const cartItem: CartItem = cartItems[index];
      totalQuantityInCart += cartItem.quantity;
    }

    return totalQuantityInCart;
  }

  getTotalAmount(): number {
    let totalCartAmount = 0;

    const cartItems = this.getCartItems();

    for (let index = 0; index < cartItems.length; index++) {
      const cartItem = cartItems[index];
      totalCartAmount +=
        Number.parseInt(cartItem.product.price) * cartItem.quantity;
    }

    return totalCartAmount;
  }
}
