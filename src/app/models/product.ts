export class Product {
  id: number;
  name: string;
  price: string;
  categoryId: number;
  categoryname: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.price = '';
    this.categoryId = 0;
    this.categoryname = '';
  }
}
