import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule 
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomePageComponent implements OnInit {

  topProducts: Product[] = [];
  bottomProducts: Product[] = [];

  categories: Category[] = [
    { name: "Para Presentear", icon: "assets/assets/presentear.png", id: "para-presentear" },
    { name: "Plantas Grandes", icon: "assets/assets/plantasGrandes.png", id: "plantas-grandes" },
    { name: "Vasos", icon: "assets/assets/vasos.png", id: "vasos" },
    { name: "Todas as plantas", icon: "assets/products/flor.jpg", id: "todas-as-plantas"} 
  ];

  bottomCategories: Category[] = [
    { name: "Kit de Sementes", icon: "assets/assets/sementes.png", id: "sementes" },
    { name: "Flores Comestíveis", icon: "assets/assets/comestiveis.png", id: "flores-comestiveis" },
    { name: "Flores", icon: "assets/assets/flores.png", id: "flores" },
    { name: "Frutifera", icon: "assets/assets/frutifera.png", id: "frutiferas" }
  ];

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (allProducts) => {
        this.topProducts = allProducts.slice(0, 6);
        this.bottomProducts = allProducts.slice(6, 12);
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  onProductSelect(product: Product): void {
    this.router.navigate(['/product']); 
  }

  onCategorySelect(categoryId: string): void {
    this.router.navigate(['/category']);
  }
  getPriceAsNumber(price: string): number {
    return parseFloat(price);
  }

  getInstallment(price: string): number {
    return parseFloat(price) / 4;
  }
}