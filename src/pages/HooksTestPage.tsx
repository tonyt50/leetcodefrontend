import React from "react";
import { HooksTest } from "../components/HooksTest/HooksTest";
import { Provider } from "../components/HooksTest/Store";

export const HooksTestPage = () => (
  <Provider>
    <div className="HookTestPage">
      <h1>Hooks Test</h1>
      <h2>
        <HooksTest />
      </h2>
    </div>
  </Provider>
);
