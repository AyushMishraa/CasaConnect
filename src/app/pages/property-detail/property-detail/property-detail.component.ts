import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { PropertyService } from 'src/app/core/services/property.service';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardActions, MatButton, CommonModule, MatIcon],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss',
  providers: [DecimalPipe]
})
export class PropertyDetailComponent {
  property: any;

  constructor(private propertyService: PropertyService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.propertyService.getPropertyById(propertyId).subscribe(property => {
        this.property = property;
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
