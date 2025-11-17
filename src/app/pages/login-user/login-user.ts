import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth';

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
  ) {}

  handleSubmit(): void {
    this.authService.login(this.formData.email, this.formData.password).subscribe({
      next: (user) => {
        this.router.navigate(['/user-dashboard']); 
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
      }
    });
  }
}