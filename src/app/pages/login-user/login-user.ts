import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  
    RouterLink    
  ],
  templateUrl: './login-user.html',
  styleUrls: ['./login-user.css']
})
export class LoginUser{

  formData = {
    email: "",
    password: ""
  };
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  handleSubmit(): void {
    this.authService.login(this.formData.email, this.formData.password).subscribe({
      next: (user) => {
        this.toastr.success('Login bem-sucedido!');
        this.router.navigate(['/user-dashboard']); 
      },
      error: (err) => {
        this.toastr.error(err.message || 'E-mail ou senha inválidos!');
      }
    });
  }
}