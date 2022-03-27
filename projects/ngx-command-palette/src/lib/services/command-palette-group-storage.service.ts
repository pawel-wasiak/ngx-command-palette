import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CommandItemGroup } from 'projects/ngx-command-palette/src/lib/model/command-item-group';

@Injectable()
export class CommandPaletteGroupStorageService {

  private storedSections$: ReplaySubject<CommandItemGroup[]> = new ReplaySubject(1);
  private storedSections: CommandItemGroup[] = [];

  select(): Observable<CommandItemGroup[]> {
    return this.storedSections$.asObservable();
  }

  get(): CommandItemGroup[] {
    return this.storedSections;
  }

  set(sections: CommandItemGroup[]): void {
    this.storedSections = sections;
    this.storedSections$.next(sections);
  }
}
