import React, { createContext, useContext, useState } from "react";

const initialStore = { color: "red", version: 1 };
export type Store = typeof initialStore;

// hook and typescript stuff might help get bannas or poem going
// https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c
// below typscript example
// https://medium.com/front-end-weekly/react-hooks-tutorial-for-pure-usereducer-usecontext-for-global-state-like-redux-and-comparison-dd3da5053624

export const storeCtx = createContext(initialStore);

export const Provider: React.ComponentType = ({ children }) => {
  const storehook = useState(initialStore);
  return <storeCtx.Provider value={storehook[0]}>{children}</storeCtx.Provider>;
};

export const useGlobalStore = <K extends keyof Store>(property: K) => {
  const store = useContext(storeCtx);
  return store[property];
};
