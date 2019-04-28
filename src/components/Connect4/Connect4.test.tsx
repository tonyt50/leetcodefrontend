import React from "react";
import ReactDOM from "react-dom";
import { Connect4 } from "./Connect4";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Connect4 />, div);
  ReactDOM.unmountComponentAtNode(div);
});
