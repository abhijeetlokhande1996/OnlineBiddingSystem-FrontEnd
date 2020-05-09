import { PaintingDetailsInterface } from './../interfaces/painting-details.interface';
export class Painting implements PaintingDetailsInterface {
  id: number;
  picture: string;
  paintingName: string;
  creator: string;
  claimedAmt: number;
  availableForBid: boolean;
}
