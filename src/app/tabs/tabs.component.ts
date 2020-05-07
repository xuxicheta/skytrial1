import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TabTitleComponent } from '../tab-title/tab-title.component';
import { TabComponent } from '../tab/tab.component';
import { TabsService } from './tabs.service';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TabsService,
  ]
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  private readonly sub = new Subscription();
  public readonly tabTitleTemplates: Observable<TemplateRef<TabTitleComponent>[]> = this.tabsService.titleTemplates;
  public readonly activeTabContentTemplate: Observable<TemplateRef<TabContentComponent>> = this.tabsService.activeContentTemplate;
  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;
  
  constructor(
    private tabsService: TabsService,
  ) { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.sub.add(this.tabListNotify());
    this.tabList.notifyOnChanges();
  }

  private tabListNotify() {
    return this.tabList.changes
      .subscribe((tabList: QueryList<TabComponent>) => this.tabsService.updateTabList(tabList.toArray()));
  }
}
