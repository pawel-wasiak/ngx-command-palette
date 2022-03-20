import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-command-palette-content',
  templateUrl: './command-palette-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
