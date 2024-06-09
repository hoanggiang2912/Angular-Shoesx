import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private ApiService: ApiService) {}

  getCategories = (url: string): any => {
    return this.ApiService.get(url, {
      responseType: 'json',
    });
  };

  addCategory = (url: string, category: any): any => {
    return this.ApiService.post(url, category, {
      responseType: 'json',
    });
  };

  updateCategory = (url: string, category: any): any => {
    return this.ApiService.patch(url, category, {
      responseType: 'json',
    });
  };

  deleteCategory = (url: string, id: string): any => {
    return this.ApiService.delete(url, {
      responseType: 'json',
    });
  };
}
