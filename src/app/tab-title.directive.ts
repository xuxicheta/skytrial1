import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabTitle]'
})
export class TabTitleDirective {

  constructor(
    public template: TemplateRef<TabTitleDirective>,
  ) { }

}
