import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  userData = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: 'admin' // Default role
  };

  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'customer', label: 'Customer' }
  ];

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.userData.name || !this.userData.email || !this.userData.password || !this.userData.mobile) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }
}
