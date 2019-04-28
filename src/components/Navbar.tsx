import React, { FC } from "react";
import { Link } from "react-router-dom";

export type RoutesData = Array<{ relativeUrl: string; displayText: string }>;

interface NavbarProps {
  routesData: RoutesData;
}

export const Navbar: FC<NavbarProps> = ({ routesData }) => (
  <ol>
    {routesData.map(({ relativeUrl, displayText }) => (
      <button key={relativeUrl}>
        <Link to={relativeUrl}>{displayText}</Link>
      </button>
    ))}
  </ol>
);
