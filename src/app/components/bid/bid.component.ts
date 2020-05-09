import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PaintingModelService } from 'src/app/services/painting-model.service';
import { Painting } from 'src/app/models/painting';
import { take } from 'rxjs/operators';
import { Config } from 'src/app/config/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent implements OnInit, AfterViewInit {
  paintingModel: Painting;
  apiUrl: string;
  mediaUrl: string;
  biddingForm: FormGroup;
  timeLeft: number = 60;
  bidders: Array<string>;
  biddingDetails: {} = {};

  biddinDataForTable: Array<[string, number]>;
  isBidEnd: boolean = false;

  constructor(
    private paintingModelService: PaintingModelService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.bidders = ['Jack Sparrow', 'Dr.Angela Yu', 'Er.Thomas'];
    this.apiUrl = Config.apiUrl;
    this.mediaUrl = this.apiUrl.slice(0, this.apiUrl.lastIndexOf('/'));
    this.biddingForm = new FormGroup({
      biddingAmt: new FormControl(null),
    });
    this.paintingModelService
      .getPaintingModel()
      .pipe(take(1))
      .subscribe((resp) => {
        this.paintingModel = resp;

        this.biddingForm
          .get('biddingAmt')
          .setValidators([
            Validators.required,
            Validators.min(this.paintingModel.claimedAmt),
          ]);

        if (this.paintingModel.claimedAmt > 0) {
          this.startTimer();
          const timeout = setTimeout(() => {
            this.generateRandomBid();
            clearTimeout(timeout);
          }, 500);
        }
      });
  }
  ngAfterViewInit(): void {}
  updatePaintingModel = (paintingModel: Painting) => {
    this.apiService.updatePaintingData(paintingModel).subscribe((resp) => {
      if (resp['result']) {
        //alert('Bid is successfully placed.');
        const objToSend = {};
        objToSend['id'] = paintingModel.id;
        objToSend['name'] = this.biddinDataForTable[0][0];
        objToSend['finalBidAmt'] = this.biddinDataForTable[0][1];
        this.apiService
          .addRecordToBidTable(objToSend)
          .subscribe((resp) => console.log(resp));
      } else {
        //alert('Unable to place bid.');
      }
    });
  };
  startTimer() {
    const interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft % 5 == 0) {
          this.generateRandomBid();
        }
      } else {
        this.timeLeft = 70;
        this.biddingForm.reset();
        this.biddingForm.disable();
        this.isBidEnd = true;
        this.paintingModel.availableForBid = false;
        this.updatePaintingModel(this.paintingModel);
        clearInterval(interval);
      }
    }, 1000);
  }
  generateRandomBid = () => {
    for (const bidderName of this.bidders) {
      if (!this.biddingDetails[bidderName]) {
        this.biddingDetails[bidderName] = this.paintingModel.claimedAmt;
      }
      let amt =
        Math.ceil(Math.random() * 1000) +
        this.biddingDetails[bidderName] +
        Math.abs(
          this.biddingDetails[bidderName] -
            ((this.biddingDetails['guest'] ? this.biddingDetails['guest'] : 0) *
              Math.random()) /
              10
        );
      this.biddingDetails[bidderName] = amt;
    } // for
    this.prepareDataFortable(this.biddingDetails);
  };
  prepareDataFortable = (bDetails) => {
    let details: Array<[string, number]> = Object.entries(bDetails);
    this.biddinDataForTable = details.sort((a, b) => b[1] - a[1]);
  };
  onBidSubmit = () => {
    const amt = this.biddingForm.get('biddingAmt').value;
    this.biddingDetails['guest'] = amt;
    this.biddingForm.get('biddingAmt').clearValidators();
    this.biddingForm
      .get('biddingAmt')
      .setValidators([Validators.required, Validators.min(amt)]);
    this.prepareDataFortable(this.biddingDetails);
    this.biddingForm.reset();
  };
}
