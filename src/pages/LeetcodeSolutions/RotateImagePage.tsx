import React, { ChangeEvent, FormEvent, PureComponent } from "react";
import { rotateImage } from "../../leetcodeSolutions/rotateimage";

interface RotateImagePageState {
  inputValue: string;
  result: string;
}

export class RotateImagePage extends PureComponent<{}, RotateImagePageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      // inputValue: "[[1]]",
      // inputValue: "[[1,2], [3,4]]",
      // inputValue: "[[1,2,3], [4,5,6], [7,8,9]]",
      // inputValue: "[[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]",
      inputValue: "[[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]",
      result: ""
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  calculateResult = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Create validation function for JSON.parse() result. Check is it really an array of arrays.
    const parsedInput = JSON.parse(this.state.inputValue) as any[][];
    const result = rotateImage(parsedInput);
    this.setState({ result: JSON.stringify(result) });
  };

  render() {
    return (
      <div>
        <header>Rotate Image page</header>
        <form onSubmit={this.calculateResult}>
          <input value={this.state.inputValue} onChange={this.handleInputChange} />
          <button>Rotate Image</button>
          <div>Result is {this.state.result}</div>
        </form>
      </div>
    );
  }
}
