import React, { useContext } from "react";
import { storeCtx, useGlobalStore } from "./Store";

export const HooksTest = () => {
  const store = useContext(storeCtx);
  const value = useGlobalStore("color");

  if (!store) {
    return null;
  }

  const [storeObject, setStore] = store;

  return (
    <div>
      <button onClick={() => setStore({ color: "blue", version: 5 })}>make blue</button>
      <li>
        useglobal {value}, use provider {storeObject.color}
      </li>
    </div>
  );
};
