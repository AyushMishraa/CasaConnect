import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/pages/auth-dialog/auth-dialog/auth-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {}

   canActivate(): boolean {
    let userFlag!: boolean;
    this.auth.user$.subscribe(user => {
      if (user?.role === 'admin' || user?.role === 'owner') {
        userFlag = true;
      } else {
        userFlag = false;
      }
    });
     if (userFlag) {
      return true;
     } else {
      this.dialog.open(AuthDialogComponent, {
            width: '800px',
            height: '800px',
            disableClose: true,
            data: { tab: 'login' }   // optional: pass which tab to show
            });
          this.router.navigate(['/login']);
      return false;
     }
   }
}
