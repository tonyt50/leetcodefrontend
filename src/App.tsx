import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

type SquareValues = "X" | "O" | "";

type Squares = SquareValues[][];

interface AppState {
  squares: Squares;
  currentPlayer: SquareValues;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    squares: createInitialSquares(),
    currentPlayer: "X"
  };

  onConnect4Click = (x: number, y: number) => {
    console.log(`Row: ${x}, Col: ${y}`);

    this.setState(prevState => {
      const { squares, currentPlayer } = prevState;

      if (squares[y][x]) {
        return { ...prevState };
      }

      const newSquares: Squares = [...squares];
      newSquares[y] = [...newSquares[y]];
      newSquares[y][x] = currentPlayer;

      return {
        squares: newSquares,
        currentPlayer: currentPlayer === "X" ? "O" : "X"
      };
    });
  };

  newGame = () => {
    this.setState({
      currentPlayer: "X",
      squares: createInitialSquares()
    });
  };

  render() {
    return (
      <div className="App">
        <body className="App-body">
          <p>Play connect 4</p>
          <button onClick={this.newGame}>New Game</button>
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
        </body>
      </div>
    );
  }
}

export default App;

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
