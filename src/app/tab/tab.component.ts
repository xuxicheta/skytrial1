import { Component, OnInit, ChangeDetectionStrategy, ContentChild, ViewChild, TemplateRef } from '@angular/core';
import { TabTitleComponent } from '../tab-title/tab-title.component';
import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
  @ContentChild(TabTitleComponent, { static: false }) tabTitle: TabTitleComponent;
  @ViewChild('titleTemplate', { static: false}) titleTemplate: TemplateRef<TabTitleComponent>;
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<TabContentComponent>;

  constructor() { }

  ngOnInit() {
  }

}
