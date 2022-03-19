import { NgModule } from '@angular/core';
import { CommandPaletteComponent } from 'projects/ngx-command-palette/src/lib/command-palette.component';
import { CommandPaletteHeaderComponent } from './command-palette-header/command-palette-header.component';
import { CommandPaletteContentComponent } from './command-palette-content/command-palette-content.component';



@NgModule({
  declarations: [
    CommandPaletteComponent,
    CommandPaletteHeaderComponent,
    CommandPaletteContentComponent
  ],
  imports: [
  ],
  exports: [
    CommandPaletteComponent
  ]
})
export class CommandPaletteModule { }
