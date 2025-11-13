import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-erro',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './erro.html',
  styleUrl: './erro.css',
})
export class Erro {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}