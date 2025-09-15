import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './core/interceptor/credential.interceptor';
import { MaterialModule } from './shared/material/material.module';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { PropertyCardComponent } from './shared/components/property-card/property-card/property-card.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    DashboardComponent,
    PropertyCardComponent,
    HttpClientModule
  ],
  providers: [
    AuthInterceptor,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

