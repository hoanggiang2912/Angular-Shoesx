import { idCategory } from './../../../types';
import { CartService } from './../../services/cart.service';
import { ProductsService } from './../../services/products.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { PRODUCTS_URL } from '../../../env';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';
import { Product, Variant } from '../../../types';
import { SectionComponent } from '../section/section.component';
import { FormControl, FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { SizeComponent } from '../size/size.component';
import { AccordionModule } from 'primeng/accordion';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    ProductComponent,
    AccordionModule,
    CommonModule,
    GalleriaModule,
    SectionComponent,
    FormsModule,
    RatingModule,
    SizeComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent {
  productId!: string;
  product!: Product;
  responsiveOptions: any[] | undefined;
  relatedProducts!: Product[];
  position: 'bottom' | 'top' | 'left' | 'right' | undefined = 'bottom';

  productQty!: FormControl;

  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private CartService: CartService
  ) {
    this.productQty = new FormControl(1);
  }

  getProduct(id: string) {
    this.ProductsService.getProduct(`${PRODUCTS_URL}/${id}`, {
      page: 1,
      limit: 1,
    }).subscribe({
      next: (data: Data) => {
        this.product = data['products'];
        // console.log(this.product);
        this.getRelatedProducts(this.product.idCategory);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  getRelatedProducts(idCategory: idCategory) {
    this.ProductsService.getRelatedProducts(
      `${PRODUCTS_URL}/category/${idCategory.parent}/${idCategory.children}`,
      {
        page: 1,
        limit: 5,
      }
    ).subscribe({
      next: (data: Data) => {
        this.relatedProducts = data['products'];
        console.log(this.relatedProducts);
        // console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addToCart(product: Product) {
    this.CartService.addToCart(product, this.productQty.value);
  }

  switchVariant(variant: Variant) {
    this.product = {
      ...this.product,
      ...variant,
    };
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('idProduct')!;

    this.getProduct(this.productId);

    this.responsiveOptions = [
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
  }
}
