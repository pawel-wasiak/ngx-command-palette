import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrls: ['./styles/styles.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
