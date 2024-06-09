import { ProductsService } from './../../services/products.service';
import { PageEvent, Product } from '../../../types';
import { SectionComponent } from '../../components/section/section.component';
import { ShopBarComponent } from '../../components/shop-bar/shop-bar.component';
import { ProductComponent } from './../../components/product/product.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { Data } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
// import { PanelMenuList } from 'primeng/panelmenu';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ProductComponent,
    ShopBarComponent,
    SectionComponent,
    PaginatorModule,
    CommonModule,
    FilterSidebarComponent,
    BreadcrumbModule,
    AccordionModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent {
  isShowFilterBar: boolean = true;
  isLoading: boolean = false;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  first: number = 1;
  rows: number = 10;
  totalRecords: number = 0;
  rowsPerPageOptions: number[] = [10, 20, 30];

  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  onFilter(products: any) {
    this.products = products;
  }

  @HostListener('load')
  fetchProducts(page: number, perPage: number) {
    this.isLoading = false;
    this.productsService
      .getProduct('http://127.0.0.1:3000/api/v1/products', {
        page,
        limit: perPage,
      })
      .subscribe({
        next: (data: Data) => {
          // console.log(data);
          this.products = data['products'];
          this.totalRecords = data['total'];
        },
        error: (err) => console.log(err),
        complete: () => (this.isLoading = false),
      });
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  toggleFilterBar($event: any) {
    this.isShowFilterBar = $event;
  }

  ngOnInit(): void {
    this.fetchProducts(this.first, this.rows);

    this.items = [{ label: 'Shop' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
