import React, { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

const initialStore = { color: "red", version: 1 };
export type Store = typeof initialStore;

// hook and typescript stuff might help get bannas or poem going
// https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c
// below typscript example
// https://medium.com/front-end-weekly/react-hooks-tutorial-for-pure-usereducer-usecontext-for-global-state-like-redux-and-comparison-dd3da5053624

export const storeCtx = createContext<
  | [
      {
        color: string;
        version: number;
      },
      Dispatch<
        SetStateAction<{
          color: string;
          version: number;
        }>
      >
    ]
  | undefined
>(undefined);

export const Provider: FC = ({ children }) => {
  const storeHook = useState(initialStore);
  return <storeCtx.Provider value={storeHook}>{children}</storeCtx.Provider>;
};

export const useGlobalStore = <K extends keyof Store>(property: K) => {
  const store = useContext(storeCtx);

  if (store === undefined) {
    throw new Error("There's no store");
  }

  return store[0][property];
};
