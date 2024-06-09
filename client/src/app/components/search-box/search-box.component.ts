import { ProductsService } from './../../services/products.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Product, Data } from '../../../types';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBoxComponent {
  searchProducts: Product[] = [];
  searchTerm = new Subject<Event>();

  @Input() isOpen!: boolean;
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private ProductsService: ProductsService,
    private cd: ChangeDetectorRef
  ) {}

  closeSearchBox() {
    this.isOpen = false;
    this.close.emit(this.isOpen);
    this.cd.detectChanges();
  }

  @HostListener('document:keydown', ['$event'])
  handleCloseSearchBox(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeSearchBox();
    }
  }

  fetchSearchProducts(page: number, limit: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const keyword = inputElement.value;

    this.ProductsService.getProduct('http://127.0.0.1:3000/api/v1/products', {
      page,
      limit,
      keyword,
    }).subscribe({
      next: (data: Data) => {
        if (Array.isArray(data.products)) {
          this.searchProducts = data.products;
        }
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.searchTerm
      .pipe(
        debounceTime(500), // wait 500ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe((event: Event) => {
        this.fetchSearchProducts(1, 6, event);
      });
  }
}
