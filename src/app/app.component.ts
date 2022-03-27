import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommandPaletteService } from 'projects/ngx-command-palette/src/lib/command-palette.service';
import { CommandItemGroup } from 'projects/ngx-command-palette/src/lib/model/command-item-group';
import { CommandItem } from 'projects/ngx-command-palette/src/lib/model/command-item';
import { AppMovies } from 'src/app/app.movies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private readonly commandPaletteService: CommandPaletteService) {
  }

  ngOnInit(): void {
    this.commandPaletteService.init();
    this.commandPaletteService.addGroups(this.getGroups());
  }

  ngOnDestroy(): void {
    this.commandPaletteService.destroy();
  }

  private getGroups(): CommandItemGroup[] {
    return [{
      title: 'Movies',
      items: AppMovies.getMovies()
    }];
  }
}
