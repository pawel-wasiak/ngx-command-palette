import { CommandItem } from 'projects/ngx-command-palette/src/lib/model/command-item';

export type CommandItemGroup = {
  readonly title?: string;
  readonly items: CommandItem[];
};
