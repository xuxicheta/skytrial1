import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
