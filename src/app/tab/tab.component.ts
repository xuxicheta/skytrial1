import { Component, OnInit, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { TabTitleDirective } from '../tab-title.directive';
import { TabContentDirective } from '../tab-content.directive';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  @ContentChild(TabTitleDirective, { static: false }) tabTitle: TabTitleDirective;
  @ContentChild(TabContentDirective, { static: false }) tabContent: TabTitleDirective;

  constructor() { }

  ngOnInit() {
  }

}
