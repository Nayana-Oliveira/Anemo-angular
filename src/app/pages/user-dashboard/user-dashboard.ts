import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { environment } from '../../../environments/environment';

const emptyAddress = {
  id: null, street: '', number: '', neighborhood: '', city: '', state: '', zipCode: ''
};

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  activeSection = "account";
  user: any = null; 
  formData: any = {}; 
  
  selectedAddress: any = null;
  isAddingAddress = false;
  addressFormData: any = { ...emptyAddress };

  completionPercentage = 0;
  
  menuItems = [
    { id: "account", label: "Minha conta", icon: "assets/assets/do-utilizador.png" },
    { id: "data", label: "Meus dados", icon: "assets/assets/documento.png" },
    { id: "addresses", label: "Meus endereços", icon: "assets/assets/mapa.png" },
    { id: "orders", label: "Pedidos", icon: "assets/assets/editar.png" },
    { id: "logout", label: "Sair", icon: "assets/assets/saida.png" },
  ];

  private apiUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser();

    if (!this.user) {
      this.router.navigate(['/login-user']);
      return;
    }
    
    this.formData = { ...this.user };
    this.completionPercentage = this.calculateProfileCompletion();
  }

  handleMenuClick(itemId: string): void {
    if (itemId === "logout") {
      this.authService.currentUser.set(null); 
      this.router.navigate(["/login-user"]);
    } else {
      this.activeSection = itemId;
      this.handleCancelAddress();
    }
  }

  handleDataSubmit(): void {
    this.http.put(`${this.apiUrl}/users/${this.user.id}`, this.formData).subscribe({
      next: (updatedUser: any) => {
        this.authService.currentUser.set(updatedUser); 
        this.user = updatedUser;
        this.formData = { ...updatedUser };
        this.completionPercentage = this.calculateProfileCompletion();
        this.activeSection = "account";
      },
      error: (err) => {
        console.error("Erro ao atualizar dados:", err);
      }
    });
  }

  handleAddressSubmit(): void {
    const isEditing = !!this.selectedAddress;
    let updatedAddresses;

    if (isEditing) {
      updatedAddresses = this.user.addresses.map((addr: any) => 
        addr.id === this.addressFormData.id ? this.addressFormData : addr
      );
    } else {
      const newAddress = { ...this.addressFormData, id: `addr${Date.now()}` };
      updatedAddresses = [...(this.user.addresses || []), newAddress];
    }

    const updatedUser = { ...this.user, addresses: updatedAddresses };

    this.http.put(`${this.apiUrl}/users/${this.user.id}`, updatedUser).subscribe({
      next: (response: any) => {
        this.authService.currentUser.set(response); 
        this.user = response;
        this.handleCancelAddress();
      },
      error: (err) => {
        console.error("Erro ao salvar endereço:", err);
      }
    });
  }

  handleAddressDelete(addressId: string): void {
    if (window.confirm("Tem certeza que deseja excluir este endereço?")) {
      const updatedAddresses = this.user.addresses.filter((addr: any) => addr.id !== addressId);
      const updatedUser = { ...this.user, addresses: updatedAddresses };

      this.http.put(`${this.apiUrl}/users/${this.user.id}`, updatedUser).subscribe({
        next: (response: any) => {
          this.authService.currentUser.set(response);
          this.user = response;
          if (this.selectedAddress?.id === addressId) {
            this.handleCancelAddress();
          }
        },
        error: (err) => {
          console.error("Erro ao excluir endereço:", err);
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

  calculateProfileCompletion(): number {
    if (!this.user) return 0;
    const fields = ['fullName', 'birthDate', 'cpf', 'phone', 'mobile', 'email'];
    const filledFields = fields.filter(field => this.user[field] && this.user[field].trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  }
}