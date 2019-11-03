import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar, RoutesData } from "../components/Navbar";
import * as Routes from "../routes";

const routesData: RoutesData = [
  { displayText: "Home", relativeUrl: Routes.home },
  { displayText: "hooks test", relativeUrl: Routes.hookstest },
  { displayText: "Connect 4", relativeUrl: Routes.connect4 },
  { displayText: "Leetcode", relativeUrl: Routes.leetcode }
];

const Home = lazy(() => import("./Home"));
const HooksTestPage = lazy(() => import("./HooksTestPage"));
const Connect4Page = lazy(() => import("./Connect4Page"));
const LeetCodeSolutionsPage = lazy(() =>
  import("./LeetcodeSolutions/LeetCodeSolutionsPage")
);

export const BasePage = () => {
  return (
    <div className="main-wrapper">
      <Navbar routesData={routesData} />
      <div className="page-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={Routes.home} exact component={Home} />
            <Route path={Routes.hookstest} exact component={HooksTestPage} />
            <Route path={Routes.connect4} component={Connect4Page} />
            <Route path={Routes.leetcode} component={LeetCodeSolutionsPage} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
};
