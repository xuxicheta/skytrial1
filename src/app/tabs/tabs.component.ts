import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabComponent } from '../tab/tab.component';
import { TabsService } from './tabs.service';
import { TabTitleDirective } from '../tab-title.directive';

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

  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;

  public readonly tabTitleTemplates = this.tabsService.selectTitleTemplates();
  public readonly activeTab = this.tabsService.activeTab;

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

  onTitleClick(template: TemplateRef<TabTitleDirective>) {
    this.tabsService.onTabTitleClick(template)
  }
}
