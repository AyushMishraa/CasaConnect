import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { PropertyService, propertyInterface} from "../../../core/services/property.service"
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MaterialModule } from '../../../shared/material/material.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatFormField } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card/property-card.component';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridList, MatGridTile, MatProgressSpinner, MatSlideToggleModule, MaterialModule, MatFormField,CommonModule, PropertyCardComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DashboardComponent {
  loading = false;
  filterForm!: FormGroup
  // properties: propertyInterface[] = [];
  filteredProperties: propertyInterface[] = [];

 constructor(private propertyService: PropertyService, private fb: FormBuilder) {}

 ngOnInit() {
  this.loading = true;
  this.loadProperties();
  this.filterForm = this.fb.group({
    Location:[],
    city: [],
    priceRange: [],
    type:[],
    bedrooms: [],
    bathrooms: [],
    available: [false]
  })
 }

 loadProperties() {
  this.loading = false;
   this.propertyService.getAllProperties().subscribe( prop => {
    this.filteredProperties = prop;
    console.log(this.filteredProperties);
   });
    // this.filteredProperties = this.properties;
 }

 applyFilters() {
   const filters = this.filterForm.value;
   console.log(filters);

 }

  resetFilters() {}
}
