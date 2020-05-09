import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bidders-table',
  templateUrl: './bidders-table.component.html',
  styleUrls: ['./bidders-table.component.css'],
})
export class BiddersTableComponent implements OnInit {
  @Input() biddinDataForTable: Array<[string, number]>;
  constructor() {}

  ngOnInit(): void {}
}
