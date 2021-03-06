import { NgModule } from '@angular/core';
import { CommandPaletteComponent } from './command-palette.component';
import { CommandPaletteHeaderComponent } from './header/command-palette-header.component';
import { CommandPaletteContentComponent } from './content/command-palette-content.component';
import { CommonModule } from '@angular/common';
import { CommandPaletteShortcutsService } from './services/command-palette-shortcuts.service';
import { CommandPaletteCreatorService } from './services/command-palette-creator-service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommandPaletteGroupStorageService } from './services/command-palette-group-storage.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommandPaletteComponent,
    CommandPaletteHeaderComponent,
    CommandPaletteContentComponent
  ],
  providers: [
    CommandPaletteShortcutsService,
    CommandPaletteCreatorService,
    CommandPaletteGroupStorageService
  ]
})
export class CommandPaletteModule { }
