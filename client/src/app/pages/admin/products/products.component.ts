import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../../../../types';
import { ProductsService } from '../../../services/products.service';
import { PRODUCTS_URL } from '../../../../env';
import { Data } from '@angular/router';
import { ProductComponent } from '../../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    PaginatorModule,
    RatingModule,
    ProductComponent,
    CommonModule,
    BreadcrumbModule,
    TableModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  products: Product[] = [];
  items: MenuItem[] | undefined;
  first: number = 1;
  rows: number = 10;
  totalRecords: number = 0;
  rowsPerPageOptions!: number[];

  home: MenuItem | undefined;

  constructor(private ProductsService: ProductsService) {}

  @HostListener('load')
  fetchProducts(page: number, perPage: number) {
    this.ProductsService.getProduct(PRODUCTS_URL, {
      page,
      limit: perPage,
      date: true,
    }).subscribe({
      next: (data: Data) => {
        // console.log(data);
        this.products = data['products'];
        this.totalRecords = data['total'];
      },
      error: (err) => console.log(err),
    });
  }

  onDelete(id: string) {
    this.ProductsService.deleteProduct(`${PRODUCTS_URL}/${id}`, id).subscribe({
      next: (data: Data) => {
        console.log(data);

        this.fetchProducts(this.first, this.rows);
      },
      error: (err) => console.log(err),
    });
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  generateRowPerPageOptions(totalRecords: number): number[] {
    const options = [];
    for (let i = 10; i <= totalRecords; i += 10) {
      options.push(i);
    }
    return options;
  }

  ngOnInit(): void {
    this.fetchProducts(this.first, this.rows);
    this.items = [{ label: 'Products' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.rowsPerPageOptions = this.generateRowPerPageOptions(this.totalRecords);
  }
}
