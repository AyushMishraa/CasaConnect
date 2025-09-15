import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { PropertyService, propertyInterface} from "../../../core/services/property.service"
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MaterialModule } from '../../../shared/material/material.module';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card/property-card.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridList, MatGridTile, MatProgressSpinner, MaterialModule, CommonModule, PropertyCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  loading = false;
  properties: propertyInterface[] = [{
        id: '433',
        title: 'ewfdc',
        bedrooms: 0,
        bathrooms: 0,
        price: 0,
        description: 'csd',
        type: 'dc',
        address: 'dcsx',
        city: 'dscds',
        available: false,
        owner: {
          id: '323',
        }
  }]

 constructor(private propertyService: PropertyService) {}

 ngOnInit() {
  this.loading = true;
  this.loadProperties();
 }

 loadProperties() {
   this.propertyService.getAllProperties().subscribe( prop => {
    this.properties = prop;
   });
   this.loading = false;
 }
}
