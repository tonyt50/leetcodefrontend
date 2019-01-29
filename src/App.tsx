import React, { Component, ChangeEvent } from "react";
// import logo from "./logo.svg";
import "./App.css";
import getLongestSubstringLength from "./longestsubstring";

class App extends Component<{}, { input: string; result: string }> {
  state = {
    input: "Hello World",
    result: ""
  };

  onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ input: value });
  };

  onButtonClick = (bunttonFunction: "longestSubstring" | "toUpperCase") => {
    const input = this.state.input;
    let result = "";
    if (bunttonFunction === "longestSubstring") {
      result = getLongestSubstringLength(input).toString();
    }
    if (bunttonFunction === "toUpperCase") {
      result = input.toUpperCase();
    }
    this.setState({ result });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="Result">{this.state.input}</p>
          <input value={this.state.input} onChange={this.onChangeInput} />
          <button onClick={() => this.onButtonClick("toUpperCase")}>
            Set upper case
          </button>
          <button onClick={() => this.onButtonClick("longestSubstring")}>
            Longest sub string
          </button>
          <p className="Result">{this.state.result}</p>
        </header>
      </div>
    );
  }
}

export default App;
