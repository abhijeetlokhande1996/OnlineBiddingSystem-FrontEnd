import { Injectable } from '@angular/core';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaintingDetailsInterface } from '../interfaces/painting-details.interface';
import { Painting } from '../models/painting';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = Config.apiUrl;
  constructor(private http: HttpClient) {}
  getAllPaintingData = (): Observable<Array<PaintingDetailsInterface>> => {
    return this.http.get<Array<PaintingDetailsInterface>>(
      `${this.apiUrl}/getAllPaintingData`
    );
  };
  updatePaintingData = (obj: Painting) => {
    return this.http.put(
      `${this.apiUrl}/updatePaintingData`,
      JSON.stringify(obj)
    );
  };
  addRecordToBidTable(obj: {}) {
    return this.http.post(`${this.apiUrl}/addRecordToBidTable`, obj);
  }
}
