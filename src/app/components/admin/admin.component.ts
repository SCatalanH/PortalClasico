import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  currentUser$ = this.authService.getCurrentUser();
  user: any;  // Define the user property

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.user = user;  // Assign the user from the observable
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
