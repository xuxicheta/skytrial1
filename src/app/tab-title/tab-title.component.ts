import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabTitleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
