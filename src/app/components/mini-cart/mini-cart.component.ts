import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Product } from '../../product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItem } from '../../cart-item.model';  // Asegúrate de tener este modelo

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit {
  cartItems: Observable<CartItem[]>;  // Actualiza para usar CartItem

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();  // Esto devuelve un Observable de CartItem[]
  }

  removeItem(item: Product): void {
    this.cartService.removeFromCart(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  ngOnInit(): void {}
}
