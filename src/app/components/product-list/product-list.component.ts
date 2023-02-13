import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  backendError: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductList().subscribe({
      next: res => {
        this.productService.setProducts(res);
        this.backendError = false;
        this.products = this.productService.getProducts();
      },
      error: error => {
        console.error('Error getting product list: ' + JSON.stringify(error));
        this.productService.setProducts([]);
        this.backendError = true;
        this.products = [];
      }
    });
  }
}
