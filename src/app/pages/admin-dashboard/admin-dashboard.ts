import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product.service'; 
import { CategoryService } from '../../services/category.service'; 
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { environment } from '../../../environments/environment';

const emptyAddress = {
  id: null, street: '', number: '', neighborhood: '', city: '', state: '', zipCode: ''
};
const emptyCategory = {
  id: '', name: '', icon: ''
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  
  activeSection = "products";
  user: any = null; 
  products: Product[] = [];
  categories: Category[] = [];

  selectedAddress: any = null;
  isAddingAddress = false;
  addressFormData: any = { ...emptyAddress };
  
  selectedCategory: any = null;
  isAddingCategory = false;
  categoryFormData: any = { ...emptyCategory };

  menuItems = [
    { id: "account", label: "Minha conta", icon: "assets/assets/do-utilizador.png" },
    { id: "products", label: "Meus produtos", icon: "assets/assets/editar.png" },
    { id: "categories", label: "Categorias", icon: "assets/assets/adicionar.svg" },
    { id: "addresses", label: "Meus endereços", icon: "assets/assets/mapa.png" },
    { id: "register-product", label: "Cadastrar produtos", icon: "assets/assets/mais.png" },
    { id: "logout", label: "Sair", icon: "assets/assets/saida.png" },
  ];

  private apiUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private http: HttpClient, 
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser();
    if (!this.user || this.user.type !== 'admin') {
      this.toastr.error("Acesso negado.");
      this.router.navigate(['/login-admin']);
      return;
    }
    
    this.loadSectionData(this.activeSection);
  }
  
  loadSectionData(section: string): void {
    if (section === "products") {
      this.fetchProducts();
    } else if (section === "categories") {
      this.fetchCategories();
    }
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        this.toastr.error('Erro ao buscar produtos.');
      }
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
        this.toastr.error("Erro ao buscar categorias.");
      }
    });
  }

  handleMenuClick(itemId: string): void {
    if (itemId === "logout") {
      this.authService.logout();
      this.router.navigate(["/login-admin"]); 
    } else if (itemId === "register-product") {
      this.router.navigate(["/product-registration"]);
    } else {
      this.activeSection = itemId;
      this.loadSectionData(itemId); 
      
      this.handleCancelAddress();
      this.handleCancelCategory();
    }
  }

  handleEditProduct(product: Product): void {
    this.router.navigate(['/edit-product'], { state: { product: product } });
  }

  handleDeleteProduct(productId: string): void {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      this.http.delete(`${this.apiUrl}/products/${productId}`).subscribe({
        next: () => {
          this.toastr.success("Produto excluído com sucesso!");
          this.fetchProducts(); 
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
          this.toastr.error("Erro ao excluir produto.");
        }
      });
    }
  }

  handleAddressSubmit(): void {
    const isEditing = !!this.selectedAddress;
    let updatedAddresses;

    if (isEditing) {
      updatedAddresses = (this.user.addresses || []).map((addr: any) => 
        addr.id === this.addressFormData.id ? this.addressFormData : addr
      );
    } else {
      const newAddress = { ...this.addressFormData, id: `addr${Date.now()}` };
      updatedAddresses = [...(this.user.addresses || []), newAddress];
    }
    const updatedAdmin = { ...this.user, addresses: updatedAddresses };

    this.http.put(`${this.apiUrl}/admins/${this.user.id}`, updatedAdmin).subscribe({
      next: (response: any) => {
        this.authService.updateCurrentUser(response);
        this.user = response;
        this.toastr.success(`Endereço ${isEditing ? 'atualizado' : 'salvo'} com sucesso!`);
        this.handleCancelAddress();
      },
      error: (err) => {
        console.error("Erro ao salvar endereço do admin:", err);
        this.toastr.error("Erro ao salvar endereço.");
      }
    });
  }
  
  handleAddressDelete(addressId: string): void {
     if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
        const updatedAddresses = this.user.addresses.filter((addr: any) => addr.id !== addressId);
        const updatedAdmin = { ...this.user, addresses: updatedAddresses };

        this.http.put(`${this.apiUrl}/admins/${this.user.id}`, updatedAdmin).subscribe({
          next: (response: any) => {
            this.authService.updateCurrentUser(response);
            this.user = response;
            this.toastr.success("Endereço excluído com sucesso!");
            if (this.selectedAddress?.id === addressId) {
              this.handleCancelAddress();
            }
          },
          error: (err) => {
            console.error("Erro ao excluir endereço do admin:", err);
            this.toastr.error("Erro ao excluir endereço.");
          }
        });
     }
  }
  
  handleSelectAddress(address: any): void {
    this.selectedAddress = address;
    this.addressFormData = { ...address };
    this.isAddingAddress = false;
  }
  
  handleAddNewAddress(): void {
    this.selectedAddress = null;
    this.addressFormData = { ...emptyAddress };
    this.isAddingAddress = true;
  }

  handleCancelAddress(): void {
    this.selectedAddress = null;
    this.isAddingAddress = false;
    this.addressFormData = { ...emptyAddress };
  }

  handleCategorySubmit(): void {
    const isEditing = !!this.selectedCategory;
    const url = isEditing
      ? `${this.apiUrl}/categories/${this.selectedCategory.id}`
      : `${this.apiUrl}/categories`;
    const method = isEditing ? 'put' : 'post';
    
    if (!/^[a-z0-9-]+$/.test(this.categoryFormData.id)) {
        this.toastr.error("O ID da categoria deve conter apenas letras minúsculas, números e hífens.");
        return;
    }
    
    this.http.request(method, url, this.categoryFormData).subscribe({
        next: () => {
            this.toastr.success(`Categoria ${isEditing ? 'atualizada' : 'salva'} com sucesso!`);
            this.fetchCategories();
            this.handleCancelCategory();
        },
        error: (err) => {
             console.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} categoria:`, err);
             this.toastr.error(`Erro ao ${isEditing ? 'atualizar' : 'salvar'} categoria.`);
        }
    });
  }

  handleCategoryDelete(categoryId: string): void {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      this.http.delete(`${this.apiUrl}/categories/${categoryId}`).subscribe({
        next: () => {
          this.toastr.success("Categoria excluída com sucesso!");
          this.fetchCategories();
          if (this.selectedCategory?.id === categoryId) {
            this.handleCancelCategory();
          }
        },
        error: (err) => {
          console.error("Erro ao excluir categoria:", err);
          this.toastr.error("Erro ao excluir categoria.");
        }
      });
    }
  }

  handleEditCategory(category: Category): void {
    this.selectedCategory = category;
    this.categoryFormData = { ...category };
    this.isAddingCategory = false;
  }
  
  handleAddNewCategory(): void {
    this.selectedCategory = null;
    this.categoryFormData = { ...emptyCategory };
    this.isAddingCategory = true;
  }
  
  handleCancelCategory(): void {
    this.selectedCategory = null;
    this.isAddingCategory = false;
    this.categoryFormData = { ...emptyCategory };
  }
}