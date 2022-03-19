import { CommandItem } from 'projects/ngx-command-palette/src/lib/command-item';

export type CommandItemSection = {
  readonly title?: string;
  readonly items: Array<CommandItem>;
};
