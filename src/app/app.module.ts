import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { CarouselModule } from 'primeng/carousel';
import { BidComponent } from './components/bid/bid.component';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { BiddersTableComponent } from './components/bidders-table/bidders-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PaintingDetailsComponent,
    BidComponent,
    HomeComponent,
    BiddersTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    CardModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
