import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './map/chart/chart.component';
import { HomeComponent } from './home/home.component';
import { SpacePipe } from './pipes/space.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CountryComponent } from './country/country.component';
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChartComponent,
    HomeComponent,
    SpacePipe,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
