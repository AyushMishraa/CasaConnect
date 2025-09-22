import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { propertyInterface, PropertyService } from '../../../../core/services/property.service';
import { MatButton } from "@angular/material/button";
import { trigger, transition, style, animate } from '@angular/animations';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatCardImage } from '@angular/material/card';
import { MatTooltip } from "@angular/material/tooltip";
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, MaterialModule, CommonModule, MatCardImage, MatTooltip],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
  animations: [
    trigger('hoverAnim', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('3000ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class PropertyCardComponent {
 @Input() property!: propertyInterface;
 user$ = this.authService.user$;
 constructor(
    private router: Router, 
    private authService: AuthService, 
    private propertyService: PropertyService,
    private snackBar: MatSnackBar
  ) {}
 
 viewDetails() {
  this.router.navigate(['/property', this.property._id]);
 }

 editProperty() {
  this.router.navigate(['/property-form', this.property._id]);
 }

  deleteProperty() {
    if (confirm('Are you sure you want to delete this property?')) {
      this.propertyService.deleteProperty(this.property._id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.error('Error deleting property:', err);
          this.snackBar.open('Failed to delete property. Please try again later.', 'Close', {
            duration: 3000,
          });
        }
      });
   }
  }
}
