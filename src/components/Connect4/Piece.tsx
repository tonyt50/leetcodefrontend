import React, { FC } from "react";

interface PieceProps {
  value: "X" | "O";
  color: "red" | "yellow";
}

const Piece: FC<PieceProps> = ({ value, color }) => {
  return (
    <svg height="30" width="30" fill={color} stroke-width="3">
      <circle
        cx="15"
        cy="15"
        r="12"
        stroke="black"
        alignment-baseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </svg>
  );
};

export const XPiece: FC = () => <Piece value="X" color="red" />;
export const OPiece: FC = () => <Piece value="O" color="yellow" />;

export default Piece;
