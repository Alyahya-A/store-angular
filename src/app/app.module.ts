import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductItemDetailComponent,
    NavBarComponent,
    PageNotFoundComponent,
    AuthenticateComponent,
    LoginFormComponent,
    SignupFormComponent,
    CartComponent,
    CartItemComponent,
    OrderListComponent,
    OrderItemComponent,
    CheckoutFormComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
