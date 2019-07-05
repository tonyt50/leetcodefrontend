import React, { useContext } from "react";
import { storeCtx, useGlobalStore } from "./Store";

export const HooksTest = () => {
  const store = useContext(storeCtx);
  const value = useGlobalStore("color");

  if (!store) {
    return null;
  }

  const [storeObject, setStore] = store;

  const { color: color, version: version } = storeObject;

  return (
    <div>
      <button onClick={() => setStore({ color: color === "blue" ? "red" : "blue", version: version + 1 })}>
        {color}
      </button>
      <li>use global color {value}</li>
      <li>use provider color {color}</li>
      <li>use provider version {version}</li>
    </div>
  );
};
