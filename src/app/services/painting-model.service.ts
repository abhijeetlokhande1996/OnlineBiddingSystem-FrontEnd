import { Injectable } from '@angular/core';
import { Painting } from '../models/painting';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaintingModelService {
  private paintingModel = new Painting();
  private subject = new BehaviorSubject(this.paintingModel);
  constructor() {}
  setPaintingModel(obj: Painting) {
    this.paintingModel = obj;
    this.subject.next(this.paintingModel);
  }
  getPaintingModel() {
    return this.subject.asObservable();
  }
}
