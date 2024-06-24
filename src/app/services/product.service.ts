import { Injectable } from '@angular/core';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', description: 'This is product 1', price: 99.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'This is product 2', price: 89.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product 3', description: 'This is product 3', price: 79.99, imageUrl: 'https://via.placeholder.com/150' }
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
