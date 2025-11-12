import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,     
    RouterOutlet,     
    HeaderComponent,  
    FooterComponent   
  ],
  templateUrl: './app.html', 
  styleUrls: ['./app.css']   
})
export class AppComponent { 
  title = 'anemo-angular';
  showHeaderFooter = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects;
      
      const routesWithoutHeaderFooter = [
        '/login-user',
        '/login-admin',
        '/register-user',
        '/register-admin'
      ];
      
      this.showHeaderFooter = !routesWithoutHeaderFooter.includes(currentRoute);
    });
  }
}