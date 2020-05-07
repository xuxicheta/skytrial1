import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabComponent } from '../tab/tab.component';
import { TabsService } from '../tabs/tabs.service';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabTitleComponent implements OnInit, OnDestroy {
  private readonly sub = new Subscription();
  private readonly activeClassName = 'tabs__title--active';

  @HostListener('click')
  onCLick() {
    this.tabsService.onTabTitleClick(this.tab);
  }

  constructor(
    private tabsService: TabsService,
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    @Optional() private tab: TabComponent,
  ) { }

  ngOnInit() {
    if (!this.tab) {
      throw new Error('tab-title component must be placed inside tab component');
    }

    this.sub.add(this.activeTitleReaction());
    this.renderer.addClass(this.el.nativeElement, 'tabs__title');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private activeTitleReaction() {
    return this.tabsService.activeTab
      .subscribe(activeTab => {
        this.setActiveClass(activeTab === this.tab);
      })
  }

  private setActiveClass(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.el.nativeElement, this.activeClassName);
    } else {
      this.renderer.removeClass(this.el.nativeElement, this.activeClassName)
    }
  }

}
