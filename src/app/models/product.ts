export class Product {
  id: number;
  name: string;
  price: string;
  categoryId: number;

  constructor(id: number, name: string, price: string, categoryId: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.categoryId = categoryId;
  }
}
