import { CommandItem } from './command-item';

export type CommandItemGroup = {
  readonly title?: string;
  readonly items: CommandItem[];
};
