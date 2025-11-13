import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
  
  formData: any = {};
  categories: Category[] = [];
  
  existingImages: string[] = [];
  newImageFiles: File[] = [];
  newImagePreviews: string[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const productToEdit = navigation?.extras?.state?.['product'];

    if (productToEdit) {
      this.formData = { ...productToEdit };
      this.existingImages = productToEdit.images || (productToEdit.image ? [productToEdit.image] : []);
    } else {
      this.toastr.error("Produto não encontrado para edição.");
      this.router.navigate(['/admin-dashboard']);
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => this.toastr.error('Erro ao carregar categorias.')
    });
  }

  handleSubmit(): void {
    if (!this.formData.category) {
      this.toastr.error("Por favor, selecione uma categoria.");
      return;
    }

    const newImagePaths = this.newImageFiles.map(file => `/products/${file.name}`);
    const updatedImages = [...this.existingImages, ...newImagePaths];

    if (updatedImages.length === 0) {
      this.toastr.error("O produto deve ter pelo menos uma imagem.");
      return;
    }

    const finalProductData = {
      ...this.formData,
      images: updatedImages,
      image: updatedImages[0], 
    };

    this.productService.updateProduct(this.formData.id, finalProductData).subscribe({
      next: () => {
        this.toastr.success("Produto atualizado com sucesso!");
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        console.error('Erro ao atualizar produto:', err);
        this.toastr.error("Erro ao atualizar o produto. Tente novamente.");
      }
    });
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      
      const uniqueFiles = files.filter(file =>
        !this.newImageFiles.some(existing => existing.name === file.name) &&
        !this.existingImages.some(existingPath => existingPath.endsWith(`/${file.name}`))
      );

      this.newImageFiles.push(...uniqueFiles);
      
      const previewUrls = uniqueFiles.map(file => URL.createObjectURL(file));
      this.newImagePreviews.push(...previewUrls);
    }
  }

  handleRemoveImage(imagePathOrUrl: string, isNew: boolean = false): void {
    if (isNew) {
      const imageIndex = this.newImagePreviews.indexOf(imagePathOrUrl);
      if (imageIndex > -1) {
         URL.revokeObjectURL(imagePathOrUrl);
         this.newImagePreviews.splice(imageIndex, 1);
         this.newImageFiles.splice(imageIndex, 1);
      }
    } else {
      this.existingImages = this.existingImages.filter(img => img !== imagePathOrUrl);
    }
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}