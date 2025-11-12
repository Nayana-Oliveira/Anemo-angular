import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { FormsModule } from '@angular/forms'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,         
    FontAwesomeModule    
  ],
  templateUrl: './header.html', 
  styleUrls: ['./header.css']  
})
export class HeaderComponent {
  
  searchTerm: string = "";
  user: any = null;
  faSearch = faSearch;

  constructor(private router: Router) {}

  handleSearchSubmit(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchTerm } });
      this.searchTerm = "";
    }
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToDashboard(): void {
    const page = this.user?.type === "admin" ? "admin-dashboard" : "user-dashboard";
    this.router.navigate([page]);
  }
}