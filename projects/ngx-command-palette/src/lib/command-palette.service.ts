import { Injectable } from '@angular/core';
import { CommandPaletteShortcutsService } from 'projects/ngx-command-palette/src/lib/services/command-palette-shortcuts.service';
import { CommandPaletteGroupStorageService } from 'projects/ngx-command-palette/src/lib/services/command-palette-group-storage.service';
import { CommandItemGroup } from 'projects/ngx-command-palette/src/lib/model/command-item-group';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {

  constructor(
    private readonly commandPaletteShortcutsService: CommandPaletteShortcutsService,
    private readonly commandPaletteSectionsStorageService: CommandPaletteGroupStorageService
  ) {
  }

  init(): void {
    this.commandPaletteShortcutsService.listen();
  }

  destroy(): void {
    this.commandPaletteShortcutsService.destroy();
  }

  addGroups(groups: CommandItemGroup[]): void {
    this.commandPaletteSectionsStorageService.set(groups);
  }

  removeGroups(groupsName: string[]): void {
    const savedSections = this.commandPaletteSectionsStorageService.get();
    this.commandPaletteSectionsStorageService.set(savedSections.filter(s => groupsName.some(n => n !== s.title)));
  }
}
