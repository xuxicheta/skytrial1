import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TabContentComponent } from '../tab-content/tab-content.component';
import { TabTitleComponent } from '../tab-title/tab-title.component';
import { TabComponent } from '../tab/tab.component';

@Injectable()
export class TabsService {
  private readonly clickedTab = new BehaviorSubject<TabComponent>(null);
  private readonly tabList = new ReplaySubject<TabComponent[]>(1);

  public readonly activeTab = this.createActiveTab(this.clickedTab, this.tabList);
  public readonly titleTemplates = this.createTitleTemplates(this.tabList);
  public readonly activeContentTemplate = this.createActiveContentTemplate(this.activeTab);

  public updateTabList(tabList: TabComponent[]) {
    this.tabList.next(tabList);
  }

  public onTabTitleClick(tab: TabComponent) {
    this.clickedTab.next(tab);
  }

  private createActiveTab(clickedTab: Observable<TabComponent>, tabList: Observable<TabComponent[]>) {
    return combineLatest<[TabComponent, TabComponent[]]>([
      clickedTab,
      tabList
    ]).pipe(
      map(([clickedTab, tabList]) => {
        return tabList.find(tab => tab === clickedTab)
          || tabList[0];
      }),
    )
  }

  private createTitleTemplates(tabList: Observable<TabComponent[]>): Observable<TemplateRef<TabTitleComponent>[]> {
    return tabList.pipe(
      map(tabs => tabs.map(tab => tab.titleTemplate)),
      debounceTime(0),
    )
  }

  private createActiveContentTemplate(activeTab: Observable<TabComponent>): Observable<TemplateRef<TabContentComponent>> {
    return activeTab.pipe(
      map(activeTab => activeTab && activeTab.contentTemplate),
      debounceTime(0),
    )
  }
}
