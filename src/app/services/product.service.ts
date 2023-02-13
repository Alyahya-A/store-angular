import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];

  constructor(private http: HttpClient) {
    this.getProductList().subscribe({
      next: res => {
        this.products = res;
      },
      error: error => {
        console.error('Error getting product list: ' + JSON.stringify(error));
        this.products = [];
      }
    });
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.apiBaseUrl + '/products');
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(
      environment.apiBaseUrl + '/products/' + productId
    );
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
