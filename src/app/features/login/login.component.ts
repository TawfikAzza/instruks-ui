import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.loginError = false;

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token);

        // Delay routing to allow guard to see the new token
        setTimeout(() => {
          console.log('Logging in, navigating to categories');
          this.router.navigate(['/categories']);
        }, 0);
      },
      error: () => {
        this.loginError = true;
        this.loading = false;
      }
    });
  }
}
