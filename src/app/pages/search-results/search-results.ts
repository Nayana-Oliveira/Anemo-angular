import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {

  results: Product[] = [];
  searchTerm: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.searchTerm = params.get('q');
      
      if (this.searchTerm) {
        this.productService.searchProducts(this.searchTerm).subscribe({
          next: (data) => this.results = data,
          error: (err) => console.error("Erro ao buscar produtos:", err)
        });
      } else {
        this.results = []; 
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