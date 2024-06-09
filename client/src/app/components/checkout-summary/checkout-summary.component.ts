import { CartService } from './../../services/cart.service';
import { Component, Input } from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CartProduct } from '../../../types';
import { CommonModule } from '@angular/common';
import { CheckoutProductComponent } from '../checkout-product/checkout-product.component';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CheckoutProductComponent, CommonModule],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.scss',
})
export class CheckoutSummaryComponent {
  @Input() subTotal!: number;
  @Input() shippingFee!: number;
  @Input() total!: number;

  cart!: CartProduct[];
  cartTotal!: number;

  constructor(private CartService: CartService) {}

  ngOnInit() {
    this.cart = this.CartService.getCart();
    // console.log(this.cart);
  }
}
