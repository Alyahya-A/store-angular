import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';
import { PlacedOrder } from '../models/placedOrder';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ORDER_STORAGE_KEY = 'ORDER_STORAGE_KEY';

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: HttpClient,
    private cartService: CartService,
    private userService: UserService
  ) {
    if (!this.storage.has(this.ORDER_STORAGE_KEY)) {
      this.storage.set(this.ORDER_STORAGE_KEY, new PlacedOrder());
    }
  }

  // convenience method to prepare headers
  getRequestHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userService.getUser().token
      })
    };
    return httpOptions;
  }

  getActiveOrder(): Observable<Order> {
    return this.http.post<Order>(
      environment.apiBaseUrl + '/orders/active',
      this.getRequestHeaders()
    );
  }

  placeOrder(
    fullName: string,
    address: string,
    creditCardNO: string
  ): Observable<Order> {
    const cartItems: CartItem[] = this.cartService.getCartItems();

    let products = [];
    for (let index = 0; index < cartItems.length; index++) {
      const cartItem = cartItems[index];
      products.push({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      });
    }

    const requestBody = {
      paymentInfo: {
        fullName: fullName,
        address: address,
        cardNo: creditCardNO
      },
      products: products
    };

    console.log(`requestBody: ${JSON.stringify(requestBody)}`);

    // place new order
    return this.http.post<Order>(
      environment.apiBaseUrl + '/orders/place',
      requestBody,
      this.getRequestHeaders()
    );
  }

  setPlacedOrder(order: PlacedOrder) {
    this.storage.set(this.ORDER_STORAGE_KEY, order);

    this.cartService.clearCart();
  }

  getPlacedOrder(): PlacedOrder {
    return this.storage.get(this.ORDER_STORAGE_KEY);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      environment.apiBaseUrl + '/orders/',
      this.getRequestHeaders()
    );
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(
      environment.apiBaseUrl +
        '/users/' +
        this.userService.getUser().id +
        '/order/' +
        orderId,
      this.getRequestHeaders()
    );
  }

  clearPlacedOrder(): void {
    this.storage.set(this.ORDER_STORAGE_KEY, new PlacedOrder());
  }
}
