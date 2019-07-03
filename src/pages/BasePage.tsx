import React from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, RoutesData } from "../components/Navbar";
import * as Routes from "../routes";
import { Connect4Page } from "./Connect4Page";
import { HomePage } from "./Home";
import { HooksTestPage } from "./HooksTestPage";
import { LeetCodeSolutionsPage } from "./LeetcodeSolutions/LeetCodeSolutionsPage";

const routesData: RoutesData = [
  { displayText: "Home", relativeUrl: Routes.home },
  { displayText: "hooks test", relativeUrl: Routes.hookstest },
  { displayText: "Connect 4", relativeUrl: Routes.connect4 },
  { displayText: "Leetcode", relativeUrl: Routes.leetcode }
];

export const BasePage = () => {
  return (
    <div className="main-wrapper">
      <Navbar routesData={routesData} />
      <div className="page-content">
        <Switch>
          <Route path={Routes.home} exact component={HomePage} />
          <Route path={Routes.hookstest} exact component={HooksTestPage} />
          <Route path={Routes.connect4} component={Connect4Page} />
          <Route path={Routes.leetcode} component={LeetCodeSolutionsPage} />
        </Switch>
      </div>
    </div>
  );
};
