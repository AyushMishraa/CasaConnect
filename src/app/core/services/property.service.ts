import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface propertyInterface {
  _id: string,
  title: string,
  bedrooms: number,
  bathrooms: number,
  price: number,
  description: string,
  type: string,
  address: string,
  city: string,
  available: boolean,
  owner: any,
  imageUrl: string[]
}
@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private api$ = `${environment.api$}`;

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<propertyInterface[]> {
   return this.http.get<propertyInterface[]>(`${this.api$}/properties`);
  }

  getPropertyById(id: string): Observable<propertyInterface> {
    return this.http.get<propertyInterface>(`${this.api$}/properties/${id}`);
  }

  createProperty(property: propertyInterface): Observable<propertyInterface> {
    return this.http.post<propertyInterface>(`${this.api$}/properties/addProperty`, property, {withCredentials: true});
  }

  updateProperty(property: propertyInterface): Observable<void> {
   return this.http.put<void>(`${this.api$}/properties/editProperty/${property._id}`, property, {withCredentials: true});
  }

  deleteProperty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api$}/properties/removeProperty/${id}`, {withCredentials: true});
  }

  getSearchedProperties(filters: any = {}): Observable<propertyInterface[]> {
     let params = new HttpParams();
    
    if (filters.city) {
      params = params.set('city', filters.city);
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice);
    }
    if (filters.minPrice) {
      params = params.set('minPrice', filters.minPrice);
    }
    if (filters.available) {
      params = params.set('available', filters.available);
    }
    return this.http.get<propertyInterface[]>(`${this.api$}/property/searchProperty`, { params });
  }

  getOwner(id: string) {{
    return this.http.get(`${this.api$}/getOwner/${id}`);
  }}
}
