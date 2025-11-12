import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';

const apiUrl = 'http://localhost:5010';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css']
})
export class RegisterUserComponent {
  
  formData = {
    fullName: "",
    birthDate: "",
    cpf: "",
    phone: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  showPassword = false;
  showConfirmPassword = false;

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

    const { confirmPassword, ...userData } = this.formData;

    this.http.post(`${apiUrl}/users`, userData).subscribe({
      next: () => {
        this.toastr.success("Cadastro realizado com sucesso!");
        this.router.navigate(['/login-user']); 
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        this.toastr.error("Erro ao cadastrar usuário. Tente novamente.");
      }
    });
  }
}