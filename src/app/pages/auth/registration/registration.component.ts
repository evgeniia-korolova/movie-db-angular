import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: '../auth.scss',
})
export class RegistrationComponent {
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    if (url) {
      this.auth.setReturnUrl(url);
    }
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.registrationForm.value;

    const success = this.auth.register(name!, email!, password!);
    if (success) {
      const redirectTo = this.auth.getReturnUrl();
      this.auth.resetReturnUrl();
      this.router.navigateByUrl(redirectTo);

    } else {
      console.log('error');

      this.errorMessage = 'User with this email already exists.';
    }
  }
}
