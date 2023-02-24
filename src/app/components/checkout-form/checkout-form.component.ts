import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiError } from 'src/app/models/apiError';
import { OrderService } from 'src/app/services/order.service';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  fullname: string = '';
  address: string = '';
  creditCard: string = '';

  apiError: ApiError = new ApiError();

  constructor(
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    const spinnerName = 'place-order-spinner';

    this.spinner.show(spinnerName);

    // place new order
    this.orderService
      .placeOrder(this.fullname, this.address, this.creditCard)
      .subscribe({
        next: response => {
          this.orderService.setPlacedOrder({
            orderId: response.id,
            paymentFullName: this.fullname,
            orderTotalAmount: response.totalAmount
          });

          this.apiError = new ApiError();

          this.el.nativeElement.dispatchEvent(
            new CustomEvent('cart-updated', {
              bubbles: true
            })
          );

          // go to the confirmation page
          this.router.navigateByUrl('/confirmation');
        },
        error: error => {
          this.spinner.hide(spinnerName);
          console.error(JSON.stringify(error));
          this.apiError = prepareApiError(error.error);
        },

        complete: () => this.spinner.hide(spinnerName)
      });
  }
}
