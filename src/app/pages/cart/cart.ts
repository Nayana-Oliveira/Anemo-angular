import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './cart.html',
  styleUrl: './cart.css', 
})
export class Cart {
  
  cartItems;
  subtotal;
  shippingCost;
  total;

  selectedPayment: string | null = null;

  constructor(
    public cartService: CartService, 
    private router: Router
  ) {
    this.cartItems = this.cartService.items;
    this.subtotal = this.cartService.subtotal;
    this.shippingCost = this.cartService.shippingCost;
    this.total = this.cartService.total;
  }

  public getPriceAsNumber(price: string): number {
    return parseFloat(price);
  }
  handleQuantityChange(item: CartItem, amount: number) {
    const newQuantity = item.quantity + amount;
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  handleRemoveItem(item: CartItem) {
    this.cartService.removeItem(item.product.id);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}