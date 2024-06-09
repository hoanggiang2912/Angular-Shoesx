import {
  Component,
  Host,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { CartProduct, Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private cartService: CartService, private router: Router) {}

  addToCart(product: CartProduct) {
    this.cartService.addToCart(product, 1);
  }

  @Input() product!: Product;

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    (target.closest('.product') as HTMLElement)
      .querySelector('.banner__overlay')
      ?.classList.add('show');
  }

  @HostListener('mouseout', ['$event']) onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    (target.closest('.product') as HTMLElement)
      .querySelector('.banner__overlay')
      ?.classList.remove('show');
  }
}
