export class PlacedOrder {
  orderId: number;
  paymentFullName: string;
  orderTotalAmount: number;

  constructor() {
    this.orderId = 0;
    this.paymentFullName = '';
    this.orderTotalAmount = 0;
  }
}
