import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <ol>
    <button>
      <Link to="/">Home</Link>
    </button>
    <button>
      <Link to="/connect4">Connect4</Link>
    </button>
    <button>
      <Link to="/longest-string">Longest String</Link>
    </button>
  </ol>
);
