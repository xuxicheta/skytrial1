import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TabTitleComponent } from '../tab-title/tab-title.component';
import { TabComponent } from '../tab/tab.component';

@Injectable()
export class TabsService {
  private readonly clickedTabTitle = new BehaviorSubject<TabTitleComponent>(null);
  private readonly tabList = new ReplaySubject<TabComponent[]>(1);
  public readonly activeTab = this.createActiveTab(this.clickedTabTitle, this.tabList);

  public updateTabList(tabList: TabComponent[]) {
    this.tabList.next(tabList);
  }

  public onTabTitleClick(tabTitle: TabTitleComponent) {
    this.clickedTabTitle.next(tabTitle);
  }

  private createActiveTab(clickedTab: Observable<TabTitleComponent>, tabList: Observable<TabComponent[]>) {
    return combineLatest<[TabTitleComponent, TabComponent[]]>([
      clickedTab,
      tabList
    ]).pipe(
      map(([clickedTabTitle, tabList]) => {
        const clickedTab = tabList.find(tab => tab.tabTitle === clickedTabTitle)
        return clickedTab || tabList[0];
      }),
    )
  }

  public selectTitleTemplates(): Observable<TemplateRef<TabTitleComponent>[]> {
    return this.tabList.pipe(
      map(tabs => tabs.map(tab => tab.titleTemplate)),
      debounceTime(0),
    )
  }
}
