export class OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  productName: string;
  productPrice: number;
  categoryname: string;

  constructor() {
    this.id = 0;
    this.order_id = 0;
    this.product_id = 0;
    this.quantity = 0;
    this.productName = '';
    this.productPrice = 0.0;
    this.categoryname = '';
  }
}
