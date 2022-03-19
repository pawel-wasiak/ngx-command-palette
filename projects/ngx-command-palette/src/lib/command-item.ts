export type CommandItem = {
  readonly text: string;
  readonly iconClass?: string;
  readonly callback?: () => void;
  readonly href?: string;
};
