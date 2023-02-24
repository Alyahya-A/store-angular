import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/models/apiError';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orders: Order[] = [];
  apiError: ApiError = new ApiError();

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: res => {
        // Culc total amount & get product info
        for (let index = 0; index < res.length; index++) {
          const order: Order = res[index];

          if (order.products.length === 0) continue;

          let totalAmount = 0;

          const products = this.productService.getProducts();

          for (const orderItem of order.products) {
            const theProduct: Product = products.filter(
              p => p.id == orderItem.product_id
            )[0];

            orderItem.productName = theProduct.name;
            orderItem.productPrice = Number.parseInt(theProduct.price);
            orderItem.categoryname = theProduct.categoryname;

            totalAmount += orderItem.productPrice * orderItem.quantity;
          }

          order.totalAmount = totalAmount;

          this.orders.push(order);
        }

        this.apiError = new ApiError();
      },
      error: error => {
        console.error('Error getting orders: ' + JSON.stringify(error));
        this.apiError = prepareApiError(error.error);
      }
    });
  }
}
