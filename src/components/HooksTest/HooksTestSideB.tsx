import React, { useContext } from "react";
import { storeCtx, useGlobalStore } from "./Store";

export const HooksTestSideB = () => {
  const store = useContext(storeCtx);
  const value = useGlobalStore("color");

  if (!store) {
    return null;
  }

  const [storeObject, setStore] = store;

  const { color, version } = storeObject;

  const handleClick = () =>
    setStore(prevStore => ({
      color: prevStore.color === "blue" ? "red" : "blue",
      version: prevStore.version + 1
    }));

  return (
    <div>
      <h2>SideB</h2>
      <button onClick={handleClick}>
        {color} clicks {version}
      </button>
      <li>use global color {value}</li>
      <li>use provider color {color}</li>
      <li>use provider version {version}</li>
    </div>
  );
};
