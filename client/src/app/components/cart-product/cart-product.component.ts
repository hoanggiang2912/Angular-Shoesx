import { CartService } from './../../services/cart.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CartProduct, Product } from '../../../types';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent {
  @Input() product!: CartProduct;
  cartProducts: CartProduct[] = [];
  cartTotal: number = 0;
  @Output() cartTotalChanged = new EventEmitter<number>();
  @Output() remove = new EventEmitter<CartProduct>();

  constructor(
    private CartService: CartService,
    private cd: ChangeDetectorRef
  ) {}

  removeFromCart(product: CartProduct) {
    this.remove.emit(product);
    this.calculateTotal();
  }

  increaseQty(product: CartProduct) {
    this.CartService.increaseQty(product);
    this.cd.detectChanges();
    this.calculateTotal();
  }

  decreaseQty(product: CartProduct) {
    this.CartService.decreaseQty(product);
    this.cd.detectChanges();
    this.calculateTotal();
  }

  calculateTotal() {
    this.cartTotal = this.cartProducts.reduce(
      (acc, cur) =>
        cur.salePrice
          ? (acc += ((cur.price * cur.salePrice) / 100) * cur.qty)
          : (acc += cur.price * cur.qty),
      0
    );
    this.cartTotalChanged.emit(this.cartTotal);
  }

  ngOnInit() {
    this.CartService.cart$.subscribe((cart) => {
      this.cartProducts = cart;
      this.cd.detectChanges();
    });
    this.calculateTotal();
  }
}
