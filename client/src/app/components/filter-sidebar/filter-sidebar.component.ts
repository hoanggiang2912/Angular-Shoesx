import { ProductsService } from './../../services/products.service';
import { CategoriesService } from './../../services/categories.service';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { Category, Product } from '../../../types';
import { CATEGORIES_URL, PRODUCTS_URL } from '../../../env';
import { AccordionModule } from 'primeng/accordion';
import { Data } from '@angular/router';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxModule, AccordionModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class FilterSidebarComponent {
  @Input() isShowFilterBar!: boolean;

  selectedCategories: any[] = [];
  categories: Category[] = [];
  gendersCategories: Category[] = [];

  categoryProducts!: Product[];
  @Output() onFilter = new EventEmitter<Product[]>();

  constructor(
    private CategoriesService: CategoriesService,
    private ProductsService: ProductsService
  ) {}

  @HostBinding('class')
  get hostClass() {
    return `col c-0 ${this.isShowFilterBar ? 'l-3 m-4' : 'l-0 m-0'}`;
  }

  fetchCategoryProduct(idCategory: string) {
    this.ProductsService.getProduct(`${PRODUCTS_URL}?children=${idCategory}`, {
      page: 1,
      limit: 10,
    }).subscribe({
      next: (data: Data) => {
        if (Array.isArray(data['products'])) {
          this.categoryProducts = data['products'];
          this.onFilter.emit(this.categoryProducts);
        }
      },
      error: (err: Error) => console.log(err),
    });
  }

  @HostListener('load')
  fetchCategories(url: string) {
    this.CategoriesService.getCategories(url).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        // console.log(categories);
      },
      error: (err: Error) => console.log(err),
    });
  }

  @HostListener('load')
  fetchGenderCategories(url: string) {
    this.CategoriesService.getCategories(url).subscribe({
      next: (categories: Category[]) => {
        this.gendersCategories = categories;
        // console.log(categories);
      },
      error: (err: Error) => console.log(err),
    });
  }

  ngOnInit() {
    this.fetchCategories(`${CATEGORIES_URL}/children`);
    this.fetchGenderCategories(`${CATEGORIES_URL}/gender`);
  }
}
