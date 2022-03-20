import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { CommandPaletteCreatorService } from 'projects/ngx-command-palette/src/lib/services/command-palette-creator-service';

@Injectable()
export class CommandPaletteShortcutsService {

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  private readonly modifierKeys: Array<string> = ['Control', 'Meta'];
  private readonly keyK: string = 'KeyK';

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
      });
  }

  destroy(): void {
    this.onDestroy$.next();
  }

  private canOpenDialog(event: KeyboardEvent): boolean {
    return event.code === this.keyK && this.modifierKeys.some(key => event.getModifierState(key));
  }
}
