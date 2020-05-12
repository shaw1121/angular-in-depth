import { Component, ContentChildren, Directive, Input, QueryList } from '@angular/core';


// Here is a slightly more realistic example that shows how ContentChildren decorators can be used to implement a tab pane component.
@Directive({ selector: 'pane' })
export class Pane {
  @Input() id !: string;
}

@Component({
  selector: 'tab',
  template: `
    <div class="top-level">Top level panes: {{serializedPanes}}</div>
    <div class="nested">Arbitrary nested panes: {{serializedNestedPanes}}</div>
  `
})
export class Tab {
  
  @ContentChildren(Pane) topLevelPanes !: QueryList<Pane>;

  // descendants - True to include all descendants, otherwise include only direct children.
  @ContentChildren(Pane, { descendants: true }) arbitraryNestedPanes !: QueryList<Pane>;

  get serializedPanes(): string {
    return this.topLevelPanes ? this.topLevelPanes.map(p => p.id).join(', ') : '';
  }
  get serializedNestedPanes(): string {
    return this.arbitraryNestedPanes ? this.arbitraryNestedPanes.map(p => p.id).join(', ') : '';
  }
}

@Component({
  selector: 'example-app',
  template: `
    <tab>
      <pane id="1"></pane>
      <pane id="2"></pane>
      <pane id="3" *ngIf="shouldShow">
        <tab>
          <pane id="3_1"></pane>
          <pane id="3_2"></pane>
        </tab>
      </pane>
    </tab>

    <button (click)="show()">Show 3</button>
  `,
})
export class ContentChildrenComponent {
  shouldShow = false;

  show() {
    this.shouldShow = true;
  }
}
