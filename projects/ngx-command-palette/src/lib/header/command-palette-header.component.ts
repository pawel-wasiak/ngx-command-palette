import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { debounceTime, Subject, take, takeUntil, tap, timer } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-command-palette-header',
  templateUrl: './command-palette-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandPaletteHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input')
  private readonly input!: ElementRef<HTMLInputElement>;

  @Output()
  readonly searchedValue$: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  readonly keyUpPressed$: Subject<void> = new Subject<void>();

  @Output()
  readonly keyDownPressed$: Subject<void> = new Subject<void>();

  @Output()
  readonly keyEnterPressed$: Subject<void> = new Subject<void>();

  readonly inputControl: FormControl = new FormControl('');
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  clearBtnVisible: boolean = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.observeSearchedValue();
  }

  ngAfterViewInit(): void {
    timer(500)
      .pipe(
        take(1),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.focusInput());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onKeyUp(event: Event): void {
    this.stopDefaultBehavior(event);
    this.keyUpPressed$.next();
  }

  onKeyDown(event: Event): void {
    this.stopDefaultBehavior(event);
    this.keyDownPressed$.next();
  }

  onKeyEnter(event: Event): void {
    this.stopDefaultBehavior(event);
    this.keyEnterPressed$.next();
  }

  clearInput(): void {
    this.inputControl.reset();
    this.focusInput();
  }

  private observeSearchedValue(): void {
    this.inputControl
        .valueChanges
        .pipe(
          tap((value) => {
            this.clearBtnVisible = !! value;
            this.changeDetectorRef.detectChanges();
          }),
          debounceTime(400),
          takeUntil(this.onDestroy$)
        )
        .subscribe(value => this.searchedValue$.next(value));

  }

  private focusInput(): void {
    this.input.nativeElement.focus()
  }

  private stopDefaultBehavior(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
