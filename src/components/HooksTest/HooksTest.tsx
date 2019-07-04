import React from "react";
import { useGlobalStore } from "./Store";

export const HooksTest = () => {
  const value = useGlobalStore("color");
  return (
    <div>
      rose are {value}, violets are {value}
    </div>
  );
};
