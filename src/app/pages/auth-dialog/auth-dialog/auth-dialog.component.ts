import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [ 
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    MaterialModule,
    MatTabsModule
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage!: string;
  showLoginForm = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]] ,
      password: ['', Validators.required]
    })

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [''],
      role: ['tenant', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.loginUser(this.loginForm.value).subscribe( {
        next: (value: any) => {
          this.snackBar.open('Login successful!', 'Close', {
            duration: 5000
          });
          this.isLoading = false;
          if (value._id) {
           this.router.navigate(['/']);
          }
          // if (this.authService.isLoggedIn()) {
          //  this.isLoading = false; 
          //  this.dialogRef.close();
          // }
        },
        error: (err) => {
          this.isLoading = false;
        }
      })
    }
  }
  
  onRegister() {
  if (this.registerForm.valid) {
    this.isLoading = true;

    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (value: any) => {
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000
        });
        this.isLoading = false;
        this.dialogRef.close();
        this.showLoginForm = true;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}
 

  updateError() {
    if (this.loginForm.controls['email'].hasError('required')) {
      this.errorMessage = 'Email is required';
    } else if (this.loginForm.controls['email'].hasError('email')) {
      this.errorMessage = 'Email is invalid';
    } else if (this.loginForm.controls['password'].hasError('required')) {
      this.errorMessage = 'Password is required';
    } else if (this.registerForm.controls['name'].hasError('required')) {
      this.errorMessage = 'Name is required';
    } else if (this.registerForm.controls['email'].hasError('required')) {
      this.errorMessage = 'Email is required';
    } else if (this.registerForm.controls['email'].hasError('email')) {
      this.errorMessage = 'Email is invalid';
    }
  }

  onClickSwitch() {
    this.showLoginForm = true;
  }
}
