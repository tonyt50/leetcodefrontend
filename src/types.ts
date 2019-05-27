export interface Letters {
  [key: string]: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface RowCol {
  row: number;
  col: number;
}
export interface WinningData {
  winner: "X" | "O";
  winningSquares: Vector[];
}
