import { Component, OnInit } from '@angular/core';
import { ApiError } from 'src/app/models/apiError';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  apiError: ApiError = new ApiError();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductList().subscribe({
      next: res => {
        this.productService.setProducts(res);
        this.products = this.productService.getProducts();
        this.apiError = new ApiError();
      },
      error: error => {
        console.error('Error getting product list: ' + JSON.stringify(error));
        this.productService.setProducts([]);
        this.apiError = prepareApiError(error.error);
      }
    });
  }
}
