import { TestBed } from '@angular/core/testing';

import { CommandPaletteService } from 'projects/ngx-command-palette/src/lib/command-palette.service';

describe('NgxCommandPaletteService', () => {
  let service: CommandPaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandPaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
