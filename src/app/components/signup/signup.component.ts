import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const username = this.signupForm.get('username')?.value || '';
      const email = this.signupForm.get('email')?.value || '';
      const password = this.signupForm.get('password')?.value || '';
      this.authService.register({ username, email, password })
        .subscribe((data: any) => {
          this.router.navigate(['/login']);
        }, error => {
          console.error(error);
        });
    }
  }
}
