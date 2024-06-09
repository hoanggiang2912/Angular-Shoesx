import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Category, Product } from '../../../../types';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductsService } from '../../../services/products.service';
import { CATEGORIES_URL, PRODUCTS_URL } from '../../../../env';
import { ActivatedRoute, Data } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    PaginatorModule,
    RatingModule,
    TableModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [MessageService],
})
export class AddProductComponent {
  categories: Category[] = [];

  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    background: new FormControl('', Validators.required),
    thumbnails: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    parent: new FormControl('', Validators.required),
    children: new FormControl('', Validators.required),
    salePrice: new FormControl('', Validators.required),
    qty: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostListener('load')
  fetchCategories() {
    this.CategoriesService.getCategories(`${CATEGORIES_URL}`).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  onDiscard() {
    this.formGroup.reset();
  }

  onAdd() {
    const product = {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      status: this.formGroup.value.status,
      background: this.formGroup.value.background,
      thumbnails: this.formGroup.value.thumbnails?.split(','),
      price: this.formGroup.value.price,
      idCategory: {
        parent: this.formGroup.value.parent,
        children: this.formGroup.value.children,
      },
      salePrice: this.formGroup.value.salePrice,
      qty: this.formGroup.value.qty,
    };

    this.ProductsService.addProduct(PRODUCTS_URL, product).subscribe({
      next: (response) => {
        console.log(response);
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product added successfully',
          });
          this.changeDetectorRef.detectChanges();
        }
      },
      error: (error) => {
        console.log(error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add product',
        });
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  ngOnInit() {
    this.fetchCategories();
  }
}
