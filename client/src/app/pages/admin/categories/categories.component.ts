import { CATEGORIES_URL } from './../../../../env';
import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { Category } from '../../../../types';
import { CategoriesService } from '../../../services/categories.service';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent {
  categories: Category[] = [];
  name = new FormControl('');

  constructor(private CategoriesService: CategoriesService) {}

  load() {
    (document.querySelector('html') as HTMLElement).style.fontSize = '100%';
  }

  getCategories() {
    this.CategoriesService.getCategories(
      `${CATEGORIES_URL}?&product=true`
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  deleteCategory(id: string) {
    this.CategoriesService.deleteCategory(
      `${CATEGORIES_URL}/${id}`,
      id
    ).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category._id !== id
      );
    });
  }

  addNewCategory() {
    this.CategoriesService.addCategory(CATEGORIES_URL, {
      name: this.name.value,
    }).subscribe((data: any) => {
      this.categories.push(data.savedCategory);
      this.getCategories();
      this.name.setValue('');
    });
  }

  ngOnInit(): void {
    this.load();
    this.getCategories();
  }
}
