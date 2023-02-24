import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthenticatedUserGuard } from './guards/authenticated-user.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'products',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'products/:id',
    component: ProductItemDetailComponent
  },
  {
    path: 'authenticate',
    component: AuthenticateComponent,
    canActivate: [NotAuthenticatedGuard]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthenticatedUserGuard]
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
