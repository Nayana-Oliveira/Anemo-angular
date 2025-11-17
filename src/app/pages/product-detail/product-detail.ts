import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  
  product: Product | null = null;
  quantity: number = 1;
  mainImage: string | undefined = '';
  productImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          
          this.mainImage = 'assets' + data.image; 
          
          this.productImages = data.images && data.images.length > 0 
                             ? data.images.map(img => 'assets' + img) 
                             : ['assets' + data.image];
        },
        error: (err) => console.error('Erro ao buscar produto:', err)
      });
    }
  }

  handleQuantityChange(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1) {
      this.quantity = newQuantity;
    }
  }

  onAddToCart(): void {
    if (this.product) {
      this.cartService.addItem(this.product, this.quantity);
    }
  }

  getPriceAsNumber(price: string): number {
    return parseFloat(price);
  }
}