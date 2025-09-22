import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service'
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthDialogComponent } from 'src/app/pages/auth-dialog/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatIcon, MatTooltipModule,AsyncPipe, CommonModule, MaterialModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$ = this.authService.user$;
  // user: string;
  // user$.subscribe(user => user = user.name);

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}
  
  onClickDashboard() {
    this.router.navigate(['/']);
  }

  openRegister() {
     this.dialog.open(AuthDialogComponent, {
      width: '800px',
      height: '800px',
      disableClose: true,
      data: { tab: 'register' }   // optional: pass which tab to show
      });
    this.router.navigate(['/register']);
  }
  openLogin() {
     this.dialog.open(AuthDialogComponent, {
      width: '800px',
      height: '800px',
      disableClose: true,
      data: { tab: 'login' }   // optional: pass which tab to show
      });
    this.router.navigate(['/login'])
  }
 
  goToProfile() {}

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
