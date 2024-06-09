import { Component, Input } from '@angular/core';
import { CartProduct } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-product.component.html',
  styleUrl: './checkout-product.component.scss',
})
export class CheckoutProductComponent {
  @Input() product!: CartProduct;

  constructor() {}
}
