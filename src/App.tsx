import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Vector } from "./types";
import { ReactComponent as Piece } from "./piece.svg";

type DirectionsObject<T extends string> = { [key in T]: Vector };

type SquareValues = "X" | "O" | "";

type Squares = SquareValues[][];

type directions = "horizontal" | "vertical" | "diagonalLeft" | "diagonalRight";

interface AppState {
  squares: Squares;
  currentPlayer: SquareValues;
  winner: "X" | "O" | undefined;
  whatColumnIsHoverd: number | undefined;
}

const directionsObject: DirectionsObject<directions> = {
  diagonalLeft: { x: -1, y: 1 },
  diagonalRight: { x: 1, y: 1 },
  horizontal: { x: 1, y: 0 },
  vertical: { x: 0, y: 1 }
};

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

      const winner = calculateWinner(
        newSquares,
        { x, y: rowToPlaceSquare },
        directionsObject
      );

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

  onColumnHover = (x: number | undefined) => {
    this.setState({ whatColumnIsHoverd: x });
  };

  render() {
    const { winner, currentPlayer } = this.state;
    const turnMessage = (
      <>
        {currentPlayer === "X" ? "Red's" : "Yellow's"}{" "}
        {currentPlayer === "X" ? <Piece /> : <Piece fill="yellow" />} turn!
      </>
    );
    const winningMessage = winner && (
      <>
        {winner === "X" ? "Red" : "Yellow"}{" "}
        {winner === "X" ? <Piece /> : <Piece fill="yellow" />} is the winner!
      </>
    );

    return (
      <div className="App">
        <div className="App-body">
          <p>Play connect 4</p>
          <button onClick={this.newGame} className="GameButton">
            New Game
          </button>
          <p>{winningMessage || turnMessage}</p>
          <div>
            {this.state.squares.map((row, y) => (
              <div className="Connect4Row" key={y}>
                {row.map((squareValue, x) => {
                  let classNames = "Connect4Button";
                  if (this.state.whatColumnIsHoverd === x) {
                    classNames += " hovered";
                  }
                  return (
                    <button
                      onMouseOver={() => this.onColumnHover(x)}
                      onMouseLeave={() => this.onColumnHover(undefined)}
                      className={classNames}
                      onClick={() => this.onConnect4Click(x, y)}
                      key={`${x}-${y}`}
                    >
                      {squareValue === "X" ? (
                        <Piece />
                      ) : squareValue === "O" ? (
                        <Piece fill="yellow" />
                      ) : (
                        undefined
                      )}
                    </button>
                  );
                })}
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
    winner: undefined,
    whatColumnIsHoverd: undefined
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

function calculateWinner<D extends string>(
  squares: SquareValues[][],
  lastChange: Vector,
  directions: DirectionsObject<D>
): "X" | "O" | undefined {
  const results: { [key: string]: number } = {};

  const team = squares[lastChange.y][lastChange.x];

  for (const [directionName, vector] of Object.entries<Vector>(directions)) {
    results[directionName] = calculateNoOfContinousTeamAlongVector(
      squares,
      lastChange,
      vector
    );
  }

  if (Object.values(results).some(result => result >= 4)) {
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
