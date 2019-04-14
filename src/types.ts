export interface Letters {
  [key: string]: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface WinningData {
  winner: "X" | "O";
  winningSquares: Vector[];
}
