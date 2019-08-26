import React, { Component } from "react";
import { Vector, WinningData } from "../../types";
// import logo from "./logo.svg";
import "./Connect4.css";
import { OPiece, XPiece } from "./Piece";

type DirectionsObject<T extends string> = { [key in T]: Vector };

type SquareValues = "X" | "O" | "";

type Squares = SquareValues[][];

type directions = "horizontal" | "vertical" | "diagonalLeft" | "diagonalRight";

interface AppState {
  squares: Squares;
  currentPlayer: SquareValues;
  winningData: WinningData | undefined;
  whatColumnIsHovered: number | undefined;
}

const directionsObject: DirectionsObject<directions> = {
  diagonalLeft: { x: -1, y: 1 },
  diagonalRight: { x: 1, y: 1 },
  horizontal: { x: 1, y: 0 },
  vertical: { x: 0, y: 1 }
};

export class Connect4 extends Component<{}, AppState> {
  state: AppState = createInitialAppState();

  onConnect4Click = (x: number, y: number) => {
    // console.log(`Row: ${x}, Col: ${y}`);
    const rowToPlaceSquare = findEmptyRowInColumn(this.state.squares, x);

    if (this.state.winningData) {
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

      const winningData = calculateWinnerData(
        newSquares,
        { x, y: rowToPlaceSquare },
        directionsObject
      );

      return {
        squares: newSquares,
        currentPlayer: currentPlayer === "X" ? "O" : "X",
        winningData
      };
    });
  };

  newGame = () => {
    this.setState(createInitialAppState());
  };

  onColumnHover = (x: number | undefined) => {
    this.setState({ whatColumnIsHovered: x });
  };

  render() {
    const { winningData, currentPlayer } = this.state;

    const turnMessage = (
      <>
        {currentPlayer === "X" ? "Red's" : "Yellow's"}{" "}
        {currentPlayer === "X" ? <XPiece /> : <OPiece />} turn!
      </>
    );
    const winningMessage = winningData && (
      <>
        {winningData.winner === "X" ? "Red" : "Yellow"}{" "}
        {winningData.winner === "X" ? <XPiece /> : <OPiece />} is the winner!
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
                  if (this.state.whatColumnIsHovered === x) {
                    classNames += " hovered";
                  }
                  if (
                    winningData &&
                    winningData.winningSquares.some(
                      winningSquare =>
                        winningSquare.x === x && winningSquare.y === y
                    )
                  ) {
                    classNames += " winner";
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
                        <XPiece />
                      ) : squareValue === "O" ? (
                        <OPiece />
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

function createInitialAppState(): AppState {
  return {
    squares: createInitialSquares(),
    currentPlayer: "X",
    winningData: undefined,
    whatColumnIsHovered: undefined
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

function calculateWinnerData<D extends string>(
  squares: SquareValues[][],
  lastChange: Vector,
  // tslint:disable-next-line: no-shadowed-variable
  directions: DirectionsObject<D>
): WinningData | undefined {
  const lastPlayer = squares[lastChange.y][lastChange.x];

  if (lastPlayer === "") {
    throw new Error("The last turn was made by someone not on a team?!?!");
  }

  const results: WinningData = {
    winner: lastPlayer,
    winningSquares: []
  };

  for (const vector of Object.values<Vector>(directions)) {
    const squaresAlongVector = calculateSquaresAlongVector(
      squares,
      lastChange,
      vector
    );
    if (squaresAlongVector.length >= 4) {
      results.winningSquares.push(...squaresAlongVector);
    }
  }

  if (results.winningSquares.length > 0) {
    return results;
  } else {
    return undefined;
  }
}

function calculateSquaresAlongVector(
  squares: SquareValues[][],
  startPosition: Vector,
  vector: Vector
): Vector[] {
  const result: Vector[] = [startPosition];
  const team = getSquareValue(squares, startPosition);

  let newVector = transformVector(startPosition, vector);
  while (
    isVectorInsideGrid(squares, newVector) &&
    getSquareValue(squares, newVector) === team
  ) {
    result.push(newVector);
    newVector = transformVector(newVector, vector);
  }

  newVector = transformVector(startPosition, inverseVector(vector));
  while (
    isVectorInsideGrid(squares, newVector) &&
    getSquareValue(squares, newVector) === team
  ) {
    result.push(newVector);
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
