import React, { ChangeEvent, FormEvent, PureComponent } from "react";
import getLongestSubstringLength from "../../leetcodeSolutions/longestsubstring";

interface LongestSubstringPageState {
  inputValue: string;
  result: number;
}

export class LongestSubstringPage extends PureComponent<{}, LongestSubstringPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: "",
      result: 0
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  calculateResult = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = getLongestSubstringLength(this.state.inputValue);
    this.setState({ result });
  };

  render() {
    return (
      <div>
        <header>Longest substring page</header>
        <form onSubmit={this.calculateResult}>
          <input value={this.state.inputValue} onChange={this.handleInputChange} />
          <button>Calculate Longest Substring</button>
          <div>Result is {this.state.result}</div>
        </form>
      </div>
    );
  }
}
