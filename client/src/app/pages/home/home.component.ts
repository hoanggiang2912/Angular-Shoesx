import { trigger, transition, style, animate } from '@angular/animations';
import { ProductsService } from './../../services/products.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostBinding,
  HostListener,
  KeyValueDiffers,
  ViewEncapsulation,
} from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ShopNowBannerComponent } from '../../components/shop-now-banner/shop-now-banner.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { SectionComponent } from '../../components/section/section.component';
import { Product, Data } from '../../../types';
import { ProductComponent } from '../../components/product/product.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { PRODUCTS_URL } from '../../../env';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ShopNowBannerComponent,
    WhyChooseUsComponent,
    SectionComponent,
    ProductComponent,
    CommentComponent,
    TabViewModule,
    CommonModule,
    SignupComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  comments = [
    {
      id: 1,
      name: 'John Doe',
      date: '2021-08-01',
      rating: 4,
      comment:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '../../../assets/images/sample-user.svg',
    },
    {
      id: 2,
      name: 'Jane Doe',
      date: '2021-08-02',
      rating: 5,
      comment:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '../../../assets/images/sample-user.svg',
    },
    {
      id: 3,
      name: 'John Doe',
      date: '2021-08-03',
      rating: 3,
      comment:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '../../../assets/images/sample-user.svg',
    },
    {
      id: 4,
      name: 'Jane Doe',
      date: '2021-08-04',
      rating: 4,
      comment:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: '../../../assets/images/sample-user.svg',
    },
  ];

  mostViewProducts: Product[] = [];
  newArrivalProducts: Product[] = [];
  categoryProducts: {
    [key: string]: Product[];
  } = {};
  categories: string[] = [];
  page: number = 1;
  perPage: number = 6;
  totalRecords = 0;

  activeTabIndex = 0;
  tabView: any;

  constructor(private productsService: ProductsService) {}

  @HostListener('load')
  fetchMostViewProducts(page: number, limit: number) {
    this.productsService
      .getProduct(PRODUCTS_URL, {
        page,
        limit,
        viewed: true,
      })
      .subscribe({
        next: (data: Data) => {
          if (Array.isArray(data.products)) {
            this.mostViewProducts = data.products;
          }
          this.totalRecords = data.total;
        },
        error: (err) => console.log(err),
      });
  }
  @HostListener('load')
  fetchNewArrivalProducts(page: number, limit: number) {
    this.productsService
      .getProduct(PRODUCTS_URL, {
        page,
        limit,
        date: true,
      })
      .subscribe({
        next: (data: Data) => {
          if (Array.isArray(data.products)) {
            this.newArrivalProducts = data.products;
          }
          this.totalRecords = data.total;
        },
        error: (err) => console.log(err),
      });
  }
  @HostListener('load')
  fetchCategoryProducts(limit: number) {
    this.productsService
      .getProduct(`${PRODUCTS_URL}/multi-category?parents=Men,Women,Kids`, {
        page: 1,
        limit: 6,
      })
      .subscribe({
        next: (data: Data) => {
          if (!Array.isArray(data.products)) {
            this.categoryProducts = data.products;
          }
          this.categories = Object.keys(this.categoryProducts);
        },
        error: (err) => console.log(err),
      });
  }

  onTabChange(event: any) {
    // get the newly activated tab panel
    const tabPanel = this.tabView.tabs[event.index];

    // apply a CSS class to trigger the animation
    tabPanel.el.nativeElement.classList.add('animate-tab-change');

    // remove the CSS class after the animation duration to be ready for the next tab change
    setTimeout(() => {
      tabPanel.el.nativeElement.classList.remove('animate-tab-change');
    }, 600); // adjust this value to match your animation duration
  }

  ngOnInit() {
    this.fetchMostViewProducts(this.page, this.perPage);
    this.fetchNewArrivalProducts(this.page, this.perPage);
    this.fetchCategoryProducts(this.perPage);
  }
}
