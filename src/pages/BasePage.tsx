import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Connect4Page } from "./Connect4Page";
import { HomePage } from "./Home";
import { LongestSubstring } from "./LongestSubstringPage";

export const BasePage = () => {
  return (
    <div className="main-wrapper">
      <Navbar />
      <div className="page-content">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/connect4" component={Connect4Page} />
          <Route path="/longest-string" component={LongestSubstring} />
        </Switch>
      </div>
    </div>
  );
};
