import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommandPaletteComponent } from 'projects/ngx-command-palette/src/lib/command-palette.component';

@Injectable()
export class CommandPaletteCreatorService {

  private componentRef: ComponentRef<CommandPaletteComponent> | undefined;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly applicationRef: ApplicationRef,
    private readonly injector: Injector,
    @Inject(DOCUMENT) public readonly document: Document
  ) {
  }

  create(): void {
    if (this.componentRef) {
      return;
    }

    const factory = this.componentFactoryResolver.resolveComponentFactory(CommandPaletteComponent);
    this.componentRef = factory.create(this.injector);
    this.applicationRef.attachView(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
    this.document.body.appendChild(this.componentRef.location.nativeElement);
  }

  destroy(): void {
    this.componentRef?.destroy();
    this.componentRef = undefined;
  }

}
