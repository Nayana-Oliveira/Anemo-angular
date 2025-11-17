import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  ) {}

  handleSubmit(): void {
    this.authService.adminLogin(this.formData.email, this.formData.password).subscribe({
      next: (admin) => {
        this.router.navigate(['/admin-dashboard']); 
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);}
    });
  }
}