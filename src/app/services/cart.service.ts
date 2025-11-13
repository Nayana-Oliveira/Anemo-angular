import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { ToastrService } from 'ngx-toastr';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public items = signal<CartItem[]>([]);

  public subtotal = computed(() => {
    return this.items().reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity);
    }, 0);
  });

  public shippingCost = signal(15.00); 

  public total = computed(() => {
    return this.subtotal() + this.shippingCost();
  });

  constructor(private toastr: ToastrService) { }

  addItem(product: Product, quantity: number = 1) {
    this.items.update(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        this.toastr.info(`Quantidade de "${product.productName}" atualizada no carrinho.`);
        return currentItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        this.toastr.success(`"${product.productName}" adicionado ao carrinho.`);
        return [...currentItems, { product, quantity }];
      }
    });
  }

  updateQuantity(productId: string, newQuantity: number) {
    this.items.update(currentItems => 
      currentItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, newQuantity) } 
          : item
      )
    );
  }

  removeItem(productId: string) {
    this.items.update(currentItems => {
      this.toastr.info(`Item removido do carrinho.`);
      return currentItems.filter(item => item.product.id !== productId);
    });
  }

  clearCart() {
    this.items.set([]);
  }
}