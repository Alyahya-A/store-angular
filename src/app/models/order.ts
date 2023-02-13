import { Product } from './product';

export class Order {
  id: number;
  status: string;
  user_id: number;
  products: Product[];

  constructor() {
    this.id = 0;
    this.status = '';
    this.user_id = 0;
    this.products = [];
  }
}
