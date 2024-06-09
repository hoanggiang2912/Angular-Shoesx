import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-hero-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-product.component.html',
  styleUrl: './hero-product.component.scss',
})
export class HeroProductComponent {
  @Input() product: any;
  @Input() activeDefault!: boolean;

  @HostBinding('class.active') get activeClass() {
    return this.activeDefault || this.isActive;
  }
  isActive = false;
  onMouseOver() {
    this.isActive = true;
  }

  onMouseOut() {
    this.isActive = false;
  }
}
