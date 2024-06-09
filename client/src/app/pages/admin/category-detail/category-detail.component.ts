import { CategoriesService } from './../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Category } from '../../../../types';
import { CATEGORIES_URL } from '../../../../env';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    RatingModule,
    TagModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
  providers: [MessageService],
})
export class CategoryDetailComponent {
  idCategory: string = '';
  category!: Category;

  name = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private CategoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  load() {
    (document.querySelector('html') as HTMLElement).style.fontSize = '100%';
  }

  fetchCategory(id: string) {
    this.CategoriesService.getCategories(
      `${CATEGORIES_URL}/category/${id}`
    ).subscribe((category: any) => {
      this.category = category;
      this.name.setValue(this.category.name);
    });
  }

  update(id: string) {
    this.showInfo('Updating category...');
    this.CategoriesService.updateCategory(`${CATEGORIES_URL}/${id}`, {
      name: this.name.value,
    }).subscribe((category: any) => {
      next: () => {
        this.category = category;
        this.name.setValue(this.category.name);
        this.showSuccess('Category updated successfully!');
      };
      error: (error: any) => {
        this.showError('Update failed! Please try again later.');
      };
    });
  }

  showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
  }

  showInfo(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail,
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Message Content',
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
    });
  }

  ngOnInit(): void {
    this.load();

    this.route.paramMap.subscribe((params) => {
      this.idCategory = params.get('idCategory')!;
      this.fetchCategory(this.idCategory);
    });
  }
}
