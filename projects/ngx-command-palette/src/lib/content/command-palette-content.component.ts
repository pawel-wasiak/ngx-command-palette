import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { CommandItemGroup } from '../model/command-item-group';
import { CommandPaletteScrollCalculator, CommandPaletteScrollParams } from './command-palette-scroll-calculator';
import { DOCUMENT } from '@angular/common';
import { take, timer } from 'rxjs';

@Component({
  selector: 'ngx-command-palette-content',
  templateUrl: './command-palette-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteContentComponent implements OnChanges, OnInit, AfterViewInit {

  @Input()
  groups: CommandItemGroup[] = [];

  @Input()
  selectedItemIndex: number = 0;

  @Output()
  readonly itemVisited$: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  readonly itemClicked$: EventEmitter<number> = new EventEmitter<number>();

  private disableMouseEnter: boolean = false;

  private elementRefNativeElem!: HTMLElement;
  private readonly scrollCalculator: CommandPaletteScrollCalculator = new CommandPaletteScrollCalculator();

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedItemIndex'] && !changes['selectedItemIndex'].firstChange) {
      this.scrollToSelectedItem();
    }
  }

  ngOnInit(): void {
    this.elementRefNativeElem = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToSelectedItem();
    });
  }

  onMouseenter(index: number): void {
    if (this.disableMouseEnter) {
      return;
    }

    this.itemVisited$.next(index);
  }

  private scrollToSelectedItem(): void {
    this.disableMouseEnter = true;
    const selectedElement = this.document.querySelectorAll<HTMLElement>('.ngx-command-palette__content-item')[this.selectedItemIndex] as HTMLElement;
    const selectedElementTopPosition = selectedElement.offsetTop;
    const containerTopPosition = this.elementRefNativeElem.offsetTop;
    const containerScrollTop: number = this.elementRefNativeElem.scrollTop;
    const containerHeight: number = this.elementRefNativeElem.offsetHeight;
    const rowHeight: number = 40;

    const params: CommandPaletteScrollParams = {
      selectedElementTopPosition,
      containerTopPosition,
      containerScrollTop,
      containerHeight,
      rowHeight
    };

    const calculatedScrollTop = this.scrollCalculator.calculate(params);

    this.elementRefNativeElem.scroll({
      top: calculatedScrollTop < 0 ? 0 : calculatedScrollTop,
      behavior: 'auto'
    });

    timer(1)
      .pipe(take(1))
      .subscribe(() => this.disableMouseEnter = false)
  }

}
