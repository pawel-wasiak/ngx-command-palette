import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommandItemGroup } from './model/command-item-group';
import { CommandItem } from './model/command-item';
import Fuse from 'fuse.js';
import { CommandPaletteGroupStorageService } from './services/command-palette-group-storage.service';
import { CommandPaletteCreatorService } from './services/command-palette-creator-service';

@Component({
  selector: 'ngx-command-palette',
  templateUrl: './command-palette.component.html',
  styleUrls: ['./styles/styles.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteComponent implements OnInit, OnDestroy {

  filteredGroups: CommandItemGroup[] = [];
  selectedItemIndex: number = 0;

  private initialGroups: CommandItemGroup[] = [];
  private allFilteredItems: CommandItem[] = [];

  private readonly fuseOptions = { keys: ['text'], threshold: 0.4 };
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly commandPaletteGroupStorageService: CommandPaletteGroupStorageService,
    private readonly commandPaletteCreatorService: CommandPaletteCreatorService
  ) {
  }

  ngOnInit(): void {
    this.observeGroups();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSearchedValue(searchValue: string): void {
    if (!searchValue) {
      this.resetToDefault();
      this.changeDetectorRef.markForCheck();
      return;
    }

    this.filteredGroups = this.initialGroups.map(g => {
      const filteredItems = new Fuse(g.items, this.fuseOptions)
        .search(searchValue)
        .map(r => r.item);

      return {
        title: g.title,
        items: filteredItems
      };
    }).filter(g => g.items.length);

    this.setAllItems(this.filteredGroups);
    this.selectedItemIndex = 0;

    this.changeDetectorRef.markForCheck();
  }

  onSelectNextItem(): void {
    this.selectedItemIndex++;
    if (this.selectedItemIndex > this.allFilteredItems.length - 1) {
      this.selectedItemIndex = 0;
    }
    this.changeDetectorRef.markForCheck();
  }

  onSelectPreviousItem(): void {
    this.selectedItemIndex--;
    if (this.selectedItemIndex < 0) {
      this.selectedItemIndex = this.allFilteredItems.length - 1;
    }
    this.changeDetectorRef.markForCheck();
  }

  onSelectItem(index: number): void {
    this.selectedItemIndex = index;
    this.changeDetectorRef.markForCheck();
  }

  onCallCallbackItem(itemIndex?: number): void {
    const selectedItem = this.allFilteredItems[itemIndex ?? this.selectedItemIndex];

    if (selectedItem.callback) {
      selectedItem.callback();
    } else if (selectedItem.href) {
      window.open(selectedItem.href, "_self");
    }

    this.commandPaletteCreatorService.destroy();
  }

  private observeGroups(): void {
    this.commandPaletteGroupStorageService
        .select()
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((groups: CommandItemGroup[]) => {
          this.initialGroups = groups;
          this.filteredGroups = groups;
          this.setAllItems(groups);
          this.selectedItemIndex = 0;
          this.changeDetectorRef.markForCheck();
        });

  }

  private setAllItems(groups: CommandItemGroup[]): void {
    this.allFilteredItems = groups.map(g => g.items).flat();
  }

  private resetToDefault(): void {
    this.filteredGroups = [...this.initialGroups];
    this.setAllItems(this.filteredGroups);
    this.selectedItemIndex = 0;
  }

}
