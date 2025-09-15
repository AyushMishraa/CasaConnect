import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service'
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatIcon, AsyncPipe, CommonModule, MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$ = this.authService.user$;
  // user: string;
  // user$.subscribe(user => user = user.name);

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  openRegister() {
    this.router.navigate(['/register']);
  }
  openLogin() {
    this.router.navigate(['/login']);
  }
  logout() {}
}
