import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaintingDetailsInterface } from 'src/app/interfaces/painting-details.interface';

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.css'],
})
export class PaintingDetailsComponent implements OnInit {
  @Input() paintingDetails: Array<PaintingDetailsInterface>;
  @Input() allowedBidTime: {};
  @Input() bidButtonState: boolean;
  @Input() mediaUrl: string;

  @Output() bidEventEmitter = new EventEmitter<PaintingDetailsInterface>();
  responsiveOptions: Array<{ breakpoint; numVisible; numScroll }>;

  constructor() {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  onClickBid = (item: PaintingDetailsInterface) => {
    this.bidEventEmitter.emit(item);
  };
}
