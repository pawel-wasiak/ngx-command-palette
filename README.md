
# ngx-command-palette

Command Palette is a quick searcher which can improve your application to the next level. On 'cmd/ctr + k' short cut user can open dialogue and search any data developer provides.




## Installation

Install ngx-command-palette with npm

```bash
npm i ngx-command-palette
```

In your app, add import: CommandPaletteModule

```javascript

import { CommandPaletteModule } from 'command-palette.module';

@NgModule({
    ...
    imports: [
        CommandPaletteModule
    ],
    ...
})
export class AppModule { }
```
## Usage

```javascript
export class AppComponent implements OnInit, OnDestroy {

  constructor(private readonly commandPaletteService: CommandPaletteService) {
  }

  ngOnInit(): void {
    // init shortcuts listener (cmd/ctrl + k)
    this.commandPaletteService.init();
    // add groups with items
    this.commandPaletteService.addGroups(this.getGroups());
  }

  ngOnDestroy(): void {
    // destroy shortcuts listener
    this.commandPaletteService.destroy();
  }

  private getGroups(): CommandItemGroup[] {
    // simple example how to define group with items
    return [{
      title: 'Movies',
      items: [
        {
            text: 'Nomadland',
            // icons css class is optional
            iconClass: 'rocket-icon'
            // callback is optional, it's called when you click on item or press enter
            callback: () => {}
            // href is optional, you can use this property instead of callback, it's called when you click on item or press enter
            href: ''
        }
      ]
    }];
  }
}
```


## License

[MIT](https://github.com/pawel-wasiak/ngx-command-palette/blob/main/LICENSE)

