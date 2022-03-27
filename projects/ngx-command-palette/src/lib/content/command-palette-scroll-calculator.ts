export type CommandPaletteScrollParams = {
  selectedElementTopPosition: number;
  containerTopPosition: number;
  containerScrollTop: number;
  containerHeight: number;
  rowHeight: number;
};

export class CommandPaletteScrollCalculator {

  calculate(params: CommandPaletteScrollParams): number {
    const { selectedElementTopPosition, containerTopPosition, containerScrollTop, containerHeight, rowHeight } = params;
    const rowTopPosition: number = selectedElementTopPosition - containerTopPosition;
    const containerScrollBottom: number = containerScrollTop + containerHeight - rowHeight;

    if (this.isRowInContainer(rowTopPosition, containerScrollTop, containerScrollBottom)) {
      return containerScrollTop;
    }

    if (this.isRowAboveContainer(rowTopPosition, containerScrollTop)) {
      return rowTopPosition;
    }

    if (this.isRowBelowContainer(rowTopPosition, containerScrollTop)) {
      return (rowTopPosition + rowHeight) - containerHeight;
    }

    return 0;
  }

  private isRowInContainer(rowTopPosition: number, containerScrollTop: number, containerScrollBottom: number): boolean {
    return !this.isRowAboveContainer(rowTopPosition, containerScrollTop) &&
      !this.isRowBelowContainer(rowTopPosition, containerScrollBottom);
  }

  private isRowAboveContainer(rowTopPosition: number, containerScrollTop: number): boolean {
    return rowTopPosition < containerScrollTop;
  }

  private isRowBelowContainer(rowTopPosition: number, containerScrollBottom: number): boolean {
    return rowTopPosition > containerScrollBottom;
  }
}
