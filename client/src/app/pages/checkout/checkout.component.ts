import { User } from './../../../types';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionComponent } from '../../components/section/section.component';
import { CartProduct, Product } from '../../../types';
import { CartService } from '../../services/cart.service';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { CheckoutSummaryComponent } from '../../components/checkout-summary/checkout-summary.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SectionComponent,
    BreadcrumbModule,
    CheckoutFormComponent,
    CheckoutSummaryComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {
  user!: User;

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  cart!: CartProduct[];

  cartTotal!: number;

  subTotal!: number;

  total!: number;

  shippingFee = 0;

  constructor(private CartService: CartService) {
    this.cart = this.CartService.getCart();

    this.cartTotal = this.CartService.getCartTotal();

    this.subTotal = this.cartTotal;

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateTotal(total: any) {
    this.total = total;
    // console.log(total);
  }

  updateShippingFee(fee: any) {
    this.shippingFee = fee;
    // console.log(fee);
  }

  ngOnInit() {
    this.items = [{ label: 'Cart' }, { label: 'Checkout' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    if (!this.user) {
      window.location.href = '/login';
    }
  }
}
