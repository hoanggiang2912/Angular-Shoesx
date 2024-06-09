import { Component } from '@angular/core';
import { HeroProductComponent } from '../hero-product/hero-product.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroProductComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  isActive = false;
  heroProducts = [
    {
      id: 1,
      name: "Tatum 2 'Vortex' PF",
      image: 'https://i.ibb.co/9r8Jyd5/image.png',
      price: 3669000,
    },
    {
      id: 2,
      name: 'Luka 2',
      image:
        'https://i.ibb.co/NKpKrg4/jordan-brand-launches-luka-2-basketball-shoe.jpg',
      price: 3669000,
    },
    {
      id: 3,
      name: 'Air Jordan XXXVIII',
      image:
        'https://i.ibb.co/CBYnwc0/jordan-brand-launches-the-air-jordan-xxxviii.jpg',
      price: 3669000,
    },
  ];

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
