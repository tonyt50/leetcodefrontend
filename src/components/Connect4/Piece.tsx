import React, { FC } from "react";
import { keyframes } from "styled-components";
interface PieceProps {
  value: "X" | "O";
  color: "red" | "yellow";
  className?: "" | "counter" | "pieceAnimDrop";
}
export const PieceDrop = keyframes`
  from {transform: translateY(-70px)}
  to {transform: translateY(0)}
`;

export const PieceAnimDrop: FC = () => {
  return (
    <span className={"pieceAnimDrop"}>
      animation: ${PieceDrop}; animation-duration: 0.5s;
    </span>
  );
};

const Piece: FC<PieceProps> = ({ value, color, className = "" }) => {
  return (
    <svg
      className={className}
      height="30"
      width="30"
      fill={color}
      stroke-width="3"
    >
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
export const XPieceAnimDrop: FC = () => (
  <g>
    <PieceAnimDrop />
    <Piece value="X" color="red" className="pieceAnimDrop" />
  </g>
);
export const OPieceAnimDrop: FC = () => (
  <g>
    <PieceAnimDrop />
    <Piece value="O" color="yellow" className="pieceAnimDrop" />
  </g>
);

export default Piece;
