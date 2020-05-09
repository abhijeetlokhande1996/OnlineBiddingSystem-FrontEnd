import { Component, OnInit } from '@angular/core';
import { PaintingDetailsInterface } from 'src/app/interfaces/painting-details.interface';
import { Subscription, interval, pipe } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

import { take } from 'rxjs/operators';
import { Config } from 'src/app/config/config';
import { Router } from '@angular/router';
import { PaintingModelService } from 'src/app/services/painting-model.service';
import { Painting } from 'src/app/models/painting';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  paintingDetailsArr: Array<PaintingDetailsInterface>;
  allowedBidTime: {};
  apiUrl: string;
  mediaUrl: string;
  bidButtonState: boolean = false;
  intervalSubscription: Subscription;
  bidStartHour: number;
  bidEndHour: number;
  paintingModel: Painting;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private paintingModelService: PaintingModelService
  ) {}

  ngOnInit(): void {
    this.apiUrl = Config.apiUrl;
    this.mediaUrl = this.apiUrl.slice(0, this.apiUrl.lastIndexOf('/'));
    this.allowedBidTime = Config.allowedBidTime;
    this.fetchAllPaitingData();
    [this.bidStartHour, this.bidEndHour] = this.convertToMilitaryTime(
      this.allowedBidTime['start'],
      this.allowedBidTime['end']
    );
    this.intervalSubscription = interval(1000).subscribe((resp) => {
      this.bidButtonState = this.updateBidButtonState(
        this.bidStartHour,
        this.bidEndHour
      );
    });
    this.paintingModelService
      .getPaintingModel()
      .pipe(take(1))
      .subscribe((resp: Painting) => (this.paintingModel = resp));
  }
  fetchAllPaitingData = () => {
    this.apiService
      .getAllPaintingData()
      .pipe(take(1))
      .subscribe(
        (resp) =>
          (this.paintingDetailsArr = resp.filter(
            (item) => item.availableForBid == true
          ))
      );
  };

  /*
   * function take time range of 12 hours clock and convert it to 24 hours clock
   */
  convertToMilitaryTime = (start: string, end: string) => {
    const militartTimingArr: Array<number> = [];
    for (const element of [start, end]) {
      let time = element;
      let hours = Number(time.match(/^(\d+)/)[1]);
      let AMPM = time.match(/\s(.*)$/)[1];
      if (AMPM == 'PM' && hours < 12) hours = hours + 12;
      if (AMPM == 'AM' && hours == 12) hours = hours - 12;
      militartTimingArr.push(hours);
    }

    return militartTimingArr;
  };
  updateBidButtonState = (startHour: number, endHour: number) => {
    let state = false;
    const hour = new Date().getHours();
    if (hour >= startHour && hour <= endHour) {
      state = true;
    } else {
      state = false;
    }
    return state;
  };
  selectedPaintingToBid = (item: Painting) => {
    this.paintingModel = item;
    this.paintingModelService.setPaintingModel(this.paintingModel);
    this.router.navigate(['bid']);
  };
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
