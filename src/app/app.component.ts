import { NavbarComponent } from './components/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AboutComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Applicazione Angular';
  constructor(private authService:AuthService){};
  ngOnInit(): void {
    this.authService.userInit()
  }
}