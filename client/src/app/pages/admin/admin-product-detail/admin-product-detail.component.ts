import { ToastModule } from 'primeng/toast';
import { CategoriesService } from './../../../services/categories.service';
import { ProductsService } from './../../../services/products.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
import { ActivatedRoute, ActivationEnd, Data } from '@angular/router';
import { Category, Product } from '../../../../types';
import { CATEGORIES_URL, PRODUCTS_URL } from '../../../../env';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-product-detail',
  standalone: true,
  imports: [
    EditorModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './admin-product-detail.component.html',
  styleUrl: './admin-product-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class AdminProductDetailComponent implements OnInit {
  productId!: string;
  product!: Product;
  parent!: string;
  children!: string;
  categories!: Category[];
  formGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    salePrice: new FormControl(''),
    description: new FormControl(''),
    parent: new FormControl(''),
    children: new FormControl(''),
    background: new FormControl(''),
    thumbnails: new FormControl(''),
    qty: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private CategoriesService: CategoriesService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  logValue(event: any) {
    // console.log(event.target.value);
    // console.log(this.formGroup.get('category')?.value);
  }

  @HostListener('load')
  fetchProduct(id: string) {
    this.ProductsService.getProduct(`${PRODUCTS_URL}/${id}`, {
      page: 1,
      limit: 1,
    }).subscribe((data: Data) => {
      this.product = data['products'];
      console.log(this.product);
      this.fetchCategories();

      this.parent = this.product?.idCategory.parent;
      this.children = this.product?.idCategory.children;
      console.log(this.parent, this.children);

      Promise.resolve().then(() => {
        this.formGroup.setValue({
          title: this.product?.title,
          price: this.product?.price.toString(),
          salePrice: this.product?.salePrice.toString(),
          description: this.product?.description,
          parent: `${this.product?.idCategory.parent}`,
          children: `${this.product?.idCategory.children}`,
          background: this.product?.background,
          thumbnails: this.product?.thumbnails.toString(),
          qty: this.product?.qty.toString(),
          status: this.product?.status?.toString() ?? null,
        });
      });

      console.log(this.formGroup);
      this.changeDetectorRef.detectChanges();
    });
  }

  @HostListener('load')
  fetchCategories() {
    this.CategoriesService.getCategories(`${CATEGORIES_URL}`).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  onSave() {
    this.showInfo();
    const product = {
      title: this.formGroup.get('title')?.value,
      price: this.formGroup.get('price')?.value,
      salePrice: this.formGroup.get('salePrice')?.value,
      description: this.formGroup.get('description')?.value,
      idCategory: {
        parent: this.formGroup.get('parent')?.value,
        children: this.formGroup.get('children')?.value,
      },
      background: this.formGroup.get('background')?.value,
      thumbnails: this.formGroup.get('thumbnails')?.value,
      qty: this.formGroup.get('qty')?.value,
      status: this.formGroup.get('status')?.value,
    };
    console.log(product);

    this.ProductsService.updateProduct(
      `${PRODUCTS_URL}/${this.productId}`,
      product
    ).subscribe({
      next: (data: Data) => {
        if (data) {
          this.showSuccess();
        } else {
          this.showWarn();
        }
      },
      error: (error) => {
        console.log(error);
        this.showError();
      },
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product has been updated successfully!',
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Product updating...',
    });

    console.log('show info');
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Something went wrong! Please try again.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Product updating failed!',
    });
  }

  onCancel() {
    this.formGroup.setValue({
      title: this.product?.title,
      price: this.product?.price.toString(),
      salePrice: this.product?.salePrice.toString(),
      description: this.product?.description,
      parent: `${this.product?.idCategory.parent}`,
      children: `${this.product?.idCategory.children}`,
      background: this.product?.background,
      thumbnails: this.product?.thumbnails.toString(),
      qty: this.product?.qty.toString(),
      status: this.product?.status?.toString() ?? null,
    });
  }

  load() {
    document.querySelector('html')!.style.fontSize = '100%';
  }

  ngOnInit(): void {
    this.load();

    this.productId = this.route.snapshot.paramMap.get('idProduct')!;

    this.fetchProduct(this.productId);
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
