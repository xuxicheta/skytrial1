import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TabComponent } from '../tab/tab.component';
import { TabTitleDirective } from '../tab-title.directive';

@Injectable()
export class TabsService {
  private readonly clickedTabTitle = new BehaviorSubject<TemplateRef<TabTitleDirective>>(null);
  private readonly tabList = new ReplaySubject<TabComponent[]>(1);
  public readonly activeTab = this.createActiveTab(this.clickedTabTitle, this.tabList);

  public updateTabList(tabList: TabComponent[]) {
    this.tabList.next(tabList);
  }

  public onTabTitleClick(template: TemplateRef<TabTitleDirective>) {
    this.clickedTabTitle.next(template);
  }

  private createActiveTab(clickedTab: Observable<TemplateRef<TabTitleDirective>>, tabList: Observable<TabComponent[]>) {
    return combineLatest<[TemplateRef<TabTitleDirective>, TabComponent[]]>([
      clickedTab,
      tabList
    ]).pipe(
      map(([clickedTitleTemplate, tabList]) => {
        const clickedTab = tabList.find(tab => tab.tabTitle.template === clickedTitleTemplate)
        return clickedTab || tabList[0];
      }),
      debounceTime(0),
    )
  }

  public selectTitleTemplates(): Observable<TemplateRef<TabTitleDirective>[]> {
    return this.tabList.pipe(
      map(tabs => tabs.map(tab => tab.tabTitle.template)),
      debounceTime(0),
    )
  }
}
