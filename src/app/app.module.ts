import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommandPaletteModule } from 'projects/ngx-command-palette/src/lib/command-palette.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommandPaletteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
