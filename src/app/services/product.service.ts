import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    if (categoryId === 'todas-as-plantas' || !categoryId) {
      return this.getProducts(); 
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products?category=${categoryId}`);
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?q=${term}`);
  }

  createProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, productData);
  }

  updateProduct(productId: string, productData: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${productId}`, productData);
  }
}