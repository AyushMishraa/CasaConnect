import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  owner: any
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

  updateProperty(property: propertyInterface) {
   this.http.put<propertyInterface>(`${this.api$}/properties/editProperty/${property._id}`, property, {withCredentials: true});
  }

  deleteProperty(id: string) {
    this.http.delete<propertyInterface>(`${this.api$}/properties/removeProperty/${id}`, {withCredentials: true});
  }

  getOwner(id: string) {{
    return this.http.get(`${this.api$}/getOwner/${id}`);
  }}
}
