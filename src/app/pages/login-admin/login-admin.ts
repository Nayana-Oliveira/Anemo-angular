// src/app/pages/login-admin/login-admin.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login-admin',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './login-admin.html',
  styleUrl: './login-admin.css',
})
export class LoginAdmin {

  formData = {
    email: "",
    password: "",
  };
  showPassword = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) {}

  handleSubmit(): void {
    this.authService.adminLogin(this.formData.email, this.formData.password).subscribe({
      next: (admin) => {
        this.toastr.success('Login de administrador bem-sucedido!');
        this.router.navigate(['/admin-dashboard']); 
      },
      error: (err) => {
        this.toastr.error(err.message || 'E-mail ou senha de administrador inválidos!');
      }
    });
  }
}