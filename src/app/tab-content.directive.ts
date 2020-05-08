import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabContent]'
})
export class TabContentDirective {

  constructor(
    public template: TemplateRef<TabContentDirective>,
  ) { }

}
