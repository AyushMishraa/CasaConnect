import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { propertyInterface } from '../../../../core/services/property.service';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
 @Input() property!: propertyInterface;
 constructor(private router: Router) {}
 
 viewDetails() {
  this.router.navigate(['/property', this.property.id]);
 }
}
