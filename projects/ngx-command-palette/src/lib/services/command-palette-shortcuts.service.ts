import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { CommandPaletteCreatorService } from './command-palette-creator-service';

@Injectable()
export class CommandPaletteShortcutsService {

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  private readonly modifierKeys: string[] = ['Control', 'Meta'];
  private readonly keyK: string = 'KeyK';
  private readonly keyEscape: string = 'Escape';

  constructor(
    @Inject(DOCUMENT) public readonly document: Document,
    private readonly commandPaletteCreatorService: CommandPaletteCreatorService
  ) {
  }

  listen(): void {
    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((event: KeyboardEvent) => {
        if (this.canOpenDialog(event)) {
          this.commandPaletteCreatorService.create();
        }

        if (event.code === this.keyEscape) {
          this.commandPaletteCreatorService.destroy();
        }
      });
  }

  destroy(): void {
    this.onDestroy$.next();
  }

  private canOpenDialog(event: KeyboardEvent): boolean {
    return event.code === this.keyK && this.modifierKeys.some(key => event.getModifierState(key));
  }
}
