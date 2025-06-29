import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../auth.scss',
})
export class LoginComponent {

  errorMessage = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    const success = this.auth.login(email!, password!);
    if (success) {
      const redirectTo = this.auth.getReturnUrl();
      this.auth.resetReturnUrl();
      this.router.navigateByUrl(redirectTo);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }


  ngOnInit(): void {    
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    if (url) {
      this.auth.setReturnUrl(url);
    }
  }
}


