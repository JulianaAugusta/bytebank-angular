import { AuthService } from '@core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  
  showPassword = signal(false);
  singupMode = signal(false);

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', this.singupMode() ? Validators.required : null),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAsDirty();
      return
    }

    const userData = this.form.getRawValue() as {email: string, name: string, password: string};
    const req = this.singupMode() ? this.auth.signUp(userData) : this.auth.login(userData);
    req.subscribe({
      next: () => {
        if(this.singupMode()) this.toggleSingup();
        this.router.navigate(['/']);
      },
      error: err => {
        //@to do implementar toast service
        console.log(err);
        if (this.singupMode()) {
          this.form.get('email')?.setErrors({emailExists: true});
        }
      }
    }); 
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleSingup() {
    this.singupMode.update(v => !v);

    //@to do: após cadastro, remover invalidez dos campos
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      name: new FormControl('', this.singupMode() ? Validators.required : null),
      password: new FormControl('', Validators.required)
    });
  }
}
