import { Component, ElementRef, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart-service.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  quantity: string = '1';

  // @Input decorator allows to pass data from parent component to child component
  @Input() product: Product;

  // inject the dependencies
  constructor(
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private el: ElementRef
  ) {
    this.product = new Product();
  }

  addToCart(): void {
    /** spinner starts on addToCart */
    this.spinner.show('spinner-' + this.product.id);

    /** spinner ends after 1 second */
    setTimeout(() => {
      this.cartService.addProductToCart(this.product, parseInt(this.quantity));

      this.spinner.hide('spinner-' + this.product.id);

      this.el.nativeElement.dispatchEvent(
        new CustomEvent('cart-updated', {
          bubbles: true
        })
      );
    }, 1000);
  }
}
