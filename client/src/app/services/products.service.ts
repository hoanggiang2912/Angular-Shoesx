import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Data } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProduct = (url: string, params: PaginationParams): Observable<Data> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  getAllProducts = (url: string): Observable<Data> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  getRelatedProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Data> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  addProduct = (url: string, product: any): Observable<any> => {
    return this.apiService.post(url, product, {
      responseType: 'json',
    });
  };

  updateProduct = (url: string, product: any): Observable<any> => {
    return this.apiService.patch(url, product, {
      responseType: 'json',
    });
  };

  deleteProduct = (url: string, id: string): Observable<any> => {
    return this.apiService.delete(url, {
      responseType: 'json',
    });
  };

  updateQty = (url: string, id: string, qty: any): Observable<any> => {
    return this.apiService.patch(
      url,
      {
        qty,
      },
      {
        responseType: 'json',
      }
    );
  };

  returnQty = (url: string, id: string, qty: any): Observable<any> => {
    return this.apiService.patch(
      url,
      {
        qty,
      },
      {
        responseType: 'json',
      }
    );
  };
}
