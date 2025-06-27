import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: '../auth.scss'
})
export class LoginComponent {

  errorMessage = '';
  constructor(private auth: AuthService, private router: Router) {}
  loginForm = new FormGroup({    
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    const success = this.auth.login(email!, password!);
    if (success) {
      this.router.navigate(['/movie']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
