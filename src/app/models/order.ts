import { OrderItem } from './orderItem';

export class Order {
  id: number;
  totalAmount: number;
  status: string;
  user_id: number;
  products: OrderItem[];

  constructor() {
    this.id = 0;
    this.totalAmount = 0.0;
    this.status = '';
    this.user_id = 0;
    this.products = [];
  }
}
