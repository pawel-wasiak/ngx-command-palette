import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandPaletteComponent } from './command-palette.component';

describe('NgxCommandPaletteComponent', () => {
  let component: CommandPaletteComponent;
  let fixture: ComponentFixture<CommandPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandPaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
