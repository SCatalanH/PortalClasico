import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: '', name: '', description: '', price: 0, imageUrl: '' };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.map(product => ({
        id: product._id ?? '', // Mapea _id a id si existe
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl
      }));
      console.log('Loaded products:', this.products); // Verifica que los productos tengan IDs correctos
    });
  }
  
  
  

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { id: '', name: '', description: '', price: 0, imageUrl: '' };
    });
  }

  deleteProduct(productId: string | undefined): void {
    if (productId) {
      console.log('Deleting product with ID:', productId); // Log para verificar el ID
      this.productService.deleteProduct(productId).subscribe(
        response => {
          // Actualiza la lista de productos después de la eliminación
          this.products = this.products.filter(product => product.id !== productId);
        },
        error => {
          console.error('Error al eliminar el producto', error);
        }
      );
    } else {
      console.error('Error: Product ID is undefined');
    }
  }
  
  
}
