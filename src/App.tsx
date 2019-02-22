import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Vector } from "./types";

type SquareValues = "X" | "O" | "";

type Squares = SquareValues[][];

interface AppState {
  squares: Squares;
  currentPlayer: SquareValues;
  winner: "X" | "O" | undefined;
}

class App extends Component<{}, AppState> {
  state: AppState = createInitialAppState();

  onConnect4Click = (x: number, y: number) => {
    console.log(`Row: ${x}, Col: ${y}`);
    const rowToPlaceSquare = findEmptyRowInColumn(this.state.squares, x);

    if (this.state.winner) {
      return;
    }

    if (rowToPlaceSquare === undefined) {
      return;
    }

    this.setState(prevState => {
      const { squares, currentPlayer } = prevState;

      const newSquares: Squares = [...squares];
      newSquares[rowToPlaceSquare] = [...newSquares[rowToPlaceSquare]];
      newSquares[rowToPlaceSquare][x] = currentPlayer;

      const winner = calculateWinner(newSquares, { x, y: rowToPlaceSquare });

      return {
        squares: newSquares,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
        winner
      };
    });
  };

  newGame = () => {
    this.setState(createInitialAppState());
  };

  render() {
    const { winner, currentPlayer } = this.state;
    return (
      <div className="App">
        <div className="App-body">
          <p>Play connect 4</p>
          <button onClick={this.newGame} className="GameButton">
            New Game
          </button>
          <p>
            {winner ? `${winner} is the winner!` : `${currentPlayer}'s turn!`}
          </p>
          <div>
            {this.state.squares.map((row, y) => (
              <div className="Connect4Row" key={y}>
                {row.map((squareValue, x) => (
                  <button
                    className="Connect4Button"
                    onClick={() => this.onConnect4Click(x, y)}
                    key={`${x}-${y}`}
                  >
                    {squareValue}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function createInitialAppState(): AppState {
  return {
    squares: createInitialSquares(),
    currentPlayer: "X",
    winner: undefined
  };
}

function createInitialSquares(): SquareValues[][] {
  return [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""]
  ];
}

function findEmptyRowInColumn(
  squares: SquareValues[][],
  x: number
): number | undefined {
  for (const [index, row] of squares.entries()) {
    if (row[x] !== "") {
      return index === 0 ? undefined : index - 1;
    }
  }

  return squares.length - 1;
}

type directions = "horizontal" | "vertical" | "diagonalLeft" | "diagonalRight";

function calculateWinner(
  squares: SquareValues[][],
  lastChange: Vector
): "X" | "O" | undefined {
  const results: { [key in directions]: {value: number, vector: Vector} } = {
    diagonalLeft: {value: 1, vector: { x: -1, y: 1 }},
    diagonalRight: {value: 1, vector: { x: 1, y: 1 }},
    horizontal: {value: 1, vector: { x: 1, y: 0 }},
    vertical: {value: 1, vector: { x: 0, y: 1 }}
  };

  const team = squares[lastChange.y][lastChange.x];

  for (const direction of Object.values(results)) {
    direction.value = calculateNoOfContinousTeamAlongVector(squares, lastChange, direction.vector)
  }

  if (Object.values(results).some(result => result.value >= 4)) {
    return team === "" ? undefined : team;
  }

  return undefined;
}

function calculateNoOfContinousTeamAlongVector(
  squares: SquareValues[][],
  startPosition: Vector,
  vector: Vector
): number {
  let result = 1;
  const team = getSquareValue(squares, startPosition);

  let newVector = transformVector(startPosition, vector);
  while (
    isVectorInsideGrid(squares, newVector) &&
    getSquareValue(squares, newVector) === team
  ) {
    result++;
    newVector = transformVector(newVector, vector);
  }

  newVector = transformVector(startPosition, inverseVector(vector));
  while (
    isVectorInsideGrid(squares, newVector) &&
    getSquareValue(squares, newVector) === team
  ) {
    result++;
    newVector = transformVector(newVector, inverseVector(vector));
  }
  return result;
}

function isVectorInsideGrid(
  squares: SquareValues[][],
  { x, y }: Vector
): boolean {
  if (x < 0 || y < 0 || y > squares.length - 1 || x > squares[0].length - 1) {
    return false;
  }
  return true;
}

function getSquareValue(
  squares: SquareValues[][],
  position: Vector
): SquareValues {
  return squares[position.y][position.x];
}

function transformVector(vectorA: Vector, vectorB: Vector): Vector {
  return { x: vectorA.x + vectorB.x, y: vectorA.y + vectorB.y };
}

function inverseVector({ x, y }: Vector): Vector {
  return { x: -x, y: -y };
}
