import React, { FC } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import * as Routes from "../../routes";
import { LongestSubstringPage } from "./LongestSubstringPage";
import { RotateImagePage } from "./RotateImagePage";
import { ScratchPage } from "./ScratchPage";

const LeetCodeSolutionsPage: FC<RouteComponentProps> = ({ match }) => {
  const routesData = [
    {
      displayText: "Longest Substring",
      relativeUrl: `${match.url}${Routes.leetcodeSubRoutes.longestSubstring}`
    },
    {
      displayText: "Rotate Image",
      relativeUrl: `${match.url}${Routes.leetcodeSubRoutes.rotateImage}`
    },
    {
      displayText: "Scratch",
      relativeUrl: `${match.url}${Routes.leetcodeSubRoutes.scratch}`
    }
  ];

  return (
    <div>
      <Navbar routesData={routesData} />
      <Switch>
        <Route
          exact
          path={match.url}
          render={() => <div>Pick a problem?</div>}
        />
        <Route
          path={`${match.url}${Routes.leetcodeSubRoutes.longestSubstring}`}
          component={LongestSubstringPage}
        />
        <Route
          path={`${match.url}${Routes.leetcodeSubRoutes.rotateImage}`}
          component={RotateImagePage}
        />
        <Route
          path={`${match.url}${Routes.leetcodeSubRoutes.scratch}`}
          component={ScratchPage}
        />
      </Switch>
    </div>
  );
};

export default LeetCodeSolutionsPage;
