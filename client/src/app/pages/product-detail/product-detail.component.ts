import { CartService } from './../../services/cart.service';
import { PRODUCTS_URL } from './../../../env';
import { ProductsService } from './../../services/products.service';
import { Product } from './../../../types';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SectionComponent } from '../../components/section/section.component';
import { Galleria, GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SectionComponent, GalleriaModule, CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent {
  product!: Product;
  productId!: string;
  value: number = 1;
  max!: number;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private ProductsService: ProductsService,
    private route: ActivatedRoute,
    private CartService: CartService
  ) {}

  fetchProduct(id: string) {
    this.ProductsService.getProduct(`${PRODUCTS_URL}/${id}`, {
      limit: 1,
      page: 1,
    }).subscribe((data: Data) => {
      this.product = data['products'];
      console.log(this.product);
    });
  }

  addToCart(product: Product, qty: number) {
    this.CartService.addToCart(product, qty);
  }

  increase() {
    if (this.value < this.max) {
      this.value++;
    }
  }

  descrease() {
    if (this.value > 1) {
      this.value--;
    }
  }

  decrease() {
    if (this.value > 1) {
      this.value--;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('idProduct')!;
      // console.log(this.productId);
    });

    this.fetchProduct(this.productId);

    this.max = (this.product! as Product).qty;
  }
}
