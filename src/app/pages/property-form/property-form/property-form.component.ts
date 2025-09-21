import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/core/services/property.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.scss'
})
export class PropertyFormComponent {
  propertyForm!: FormGroup;
  isEditMode = false;
  propertyId!: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.propertyId;

    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      available: [false],
      price: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['']
    });

    if (this.isEditMode && this.propertyId) {
      this.loadProperty();
    }
  }

  loadProperty() {
    this.propertyService.getPropertyById(this.propertyId!).subscribe({
      next: (property) => this.propertyForm.patchValue(property),
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    if (this.propertyForm.invalid) return;

    if (this.isEditMode) {
      console.log(this.propertyForm.value);
      this.propertyForm.value._id = this.propertyId;
      this.propertyService.updateProperty(this.propertyForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    } else {
      this.propertyService.createProperty(this.propertyForm.value).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
