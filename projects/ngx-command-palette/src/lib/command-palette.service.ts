import { Injectable } from '@angular/core';
import { CommandPaletteShortcutsService } from 'projects/ngx-command-palette/src/lib/services/command-palette-shortcuts.service';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {

  constructor(
    private readonly commandPaletteShortcutsService: CommandPaletteShortcutsService
  ) {
  }

  init(): void {
    this.commandPaletteShortcutsService.listen();
  }

  destroy(): void {
    this.commandPaletteShortcutsService.destroy();
  }
}
