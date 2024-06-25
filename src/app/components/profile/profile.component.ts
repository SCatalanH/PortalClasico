// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser$!: Observable<any>;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.currentUser$ = this.authService.getCurrentUser();
    this.currentUser$.subscribe(user => {
      this.profileForm.patchValue({
        username: user?.username,
        email: user?.email
      });
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe();
    }
  }
}
