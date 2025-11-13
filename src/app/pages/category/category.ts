import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {

  products: Product[] = [];
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      
      if (categoryId) {
        if (categoryId === 'todas-as-plantas') {
          this.categoryName = 'Todas as Plantas';
        } else {
          this.categoryName = categoryId.replace(/-/g, ' ');
        }
        
        this.productService.getProductsByCategory(categoryId).subscribe({
          next: (data) => this.products = data,
          error: (err) => console.error("Erro ao buscar produtos da categoria:", err)
        });
      }
    });
  }

  onProductSelect(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  getPriceAsNumber(price: string): number {
    return parseFloat(price);
  }
}