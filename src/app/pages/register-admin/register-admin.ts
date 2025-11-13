import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment'; 

@Component({
  selector: 'app-register-admin',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ], 
  templateUrl: './register-admin.html',
  styleUrl: './register-admin.css',
})

export class RegisterAdmin { 

  formData = {
    fullName: "",
    birthDate: "",
    cnpj: "",
    phone: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  showPassword = false;
  showConfirmPassword = false;

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  handleSubmit(): void {
    if (this.formData.password !== this.formData.confirmPassword) {
      this.toastr.error("As senhas não correspondem!");
      return;
    }

    const { confirmPassword, ...adminData } = this.formData;

    this.http.post(`${this.apiUrl}/admins`, adminData).subscribe({
      next: () => {
        this.toastr.success("Cadastro de administrador realizado com sucesso!");
        this.router.navigate(['/login-admin']); 
      },
      error: (err) => {
        console.error('Erro ao cadastrar administrador:', err);
        this.toastr.error("Erro ao cadastrar administrador. Tente novamente.");
      }
    });
  }
}