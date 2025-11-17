import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './product-registration.html',
  styleUrl: './product-registration.css',
})
export class ProductRegistration implements OnInit {

  formData: any = {
    productName: "",
    productId: "",
    category: "",
    price: "",
    quantity: "",
    size: "",
    description: "",
  };

  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
    });
  }

  handleSubmit(): void {
    if (!this.formData.category) {
      return;
    }
    if (this.imageFiles.length === 0) {
      return;
    }

    const finalProductData = {
      ...this.formData,
      image: `/products/${this.imageFiles[0].name}`,
      images: this.imageFiles.map(file => `/products/${file.name}`),
    };

    this.productService.createProduct(finalProductData).subscribe({
      next: () => {
        this.router.navigate(["/admin-dashboard"]);
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto:', err);
      }
    });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imageFiles = Array.from(input.files);
      
      this.imagePreviews.forEach(url => URL.revokeObjectURL(url));
      
      this.imagePreviews = this.imageFiles.map(file => URL.createObjectURL(file));
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}