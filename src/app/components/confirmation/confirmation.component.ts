import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlacedOrder } from 'src/app/models/placedOrder';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  placedOrder: PlacedOrder = new PlacedOrder();

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.placedOrder = this.orderService.getPlacedOrder();

    // if no order recently placed return user to home
    if (!this.placedOrder || this.placedOrder.orderId === 0)
      this.router.navigateByUrl('/');
  }
}
