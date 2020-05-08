import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'tabpanel' },
})
export class TabContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
