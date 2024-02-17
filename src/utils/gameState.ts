export function numberOfFilledCellInGrid(
  grid: {key: string; sign: number}[],
): number {
  return grid.filter(a => {
    return a.sign != -1;
  }).length;
}

export function gameWinner(grid: {key: string; sign: number}[]): number {
  if (numberOfFilledCellInGrid(grid) < 5) {
    return -1;
  }
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      grid[a] &&
      grid[a].sign === grid[b].sign &&
      grid[a].sign === grid[c].sign
    ) {
      return grid[a].sign;
    }
  }
  return -1;
}
