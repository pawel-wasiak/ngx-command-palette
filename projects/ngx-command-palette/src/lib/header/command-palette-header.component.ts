import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-command-palette-header',
  templateUrl: './command-palette-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteHeaderComponent {

  @Input()
  selectedItemValue?: string;

  @Output()
  readonly searchedValue: EventEmitter<string> = new EventEmitter<string>();

}
