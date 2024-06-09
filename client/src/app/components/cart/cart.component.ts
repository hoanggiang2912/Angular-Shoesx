import { CartService } from './../../services/cart.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CartProductComponent } from '../cart-product/cart-product.component';
import { CartProduct, Product } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Input() isOpen!: boolean;
  @Output() close = new EventEmitter<boolean>();
  cartTotal: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
    private cartService: CartService,
    private route: Router
  ) {}

  cartProducts: CartProduct[] = [];

  closeCart() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartProducts = [];
    this.cartTotal = 0;
  }

  removeFromCart(product: CartProduct) {
    this.cartService.removeFromCart(product);
    this.updateCartTotal(this.cartService.calculateTotal());
  }

  checkout() {
    if (this.cartProducts.length > 0) {
      this.route.navigate(['/cart/checkout']);
    } else {
      alert('Cart is empty');
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeCart();
  }

  updateCartTotal(total: any) {
    this.cartTotal = total;
    console.log(this.cartTotal);
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartProducts = cart;
      this.cd.detectChanges();
    });
    this.cartTotal = this.cartProducts.reduce(
      (acc, cur) =>
        cur.salePrice
          ? (acc += ((cur.price * cur.salePrice) / 100) * cur.qty)
          : (acc += cur.price * cur.qty),
      0
    );
  }
}
