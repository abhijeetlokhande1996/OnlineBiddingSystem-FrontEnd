import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { BidComponent } from './components/bid/bid.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'bid',
    component: BidComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
