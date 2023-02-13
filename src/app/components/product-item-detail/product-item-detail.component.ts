import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiError } from 'src/app/models/apiError';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product.service';
import { prepareApiError } from 'src/app/utils/prepareApiError';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  productId: number = 0;

  product: Product = new Product();

  quantity: string = '1';

  apiError: ApiError = new ApiError();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
      ? parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string)
      : 0;

    this.productService.getProduct(this.productId).subscribe({
      next: res => {
        this.product = res;
      },
      error: error => {
        console.error(
          "Couldn't get  product for " +
            this.productId +
            ': ' +
            JSON.stringify(error)
        );
        this.product = new Product();

        this.apiError = prepareApiError(error.error);
      }
    });
  }

  addToCart(): void {
    this.spinner.show();

    setTimeout(() => {
      this.cartService.addProductToCart(this.product, parseInt(this.quantity));

      this.spinner.hide();

      this.el.nativeElement.dispatchEvent(
        new CustomEvent('cart-updated', {
          bubbles: true
        })
      );
    }, 1000);
  }
}
