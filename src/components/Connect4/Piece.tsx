import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
interface PieceProps {
  value?: "X" | "O";
  color?: "red" | "yellow";
}

// use a functional component, that has a styled component wrapping
export const Piece: FC<PieceProps> = ({ value, color }) => {
  return (
    <StyledSVG height="30" width="30">
      <circle
        cx="15"
        cy="15"
        r="12"
        fill={color}
        stroke="black"
        stroke-width="2"
        alignmentBaseline="middle"
      />
      <text x="15" y="22" fill="black" textAnchor="middle" fontSize="75%">
        {value}
      </text>
    </StyledSVG>
  );
};

export const PieceDrop = keyframes`
  from {transform: translateY(-70px)}
  to {transform: translateY(0)}
`;

const StyledSVG = styled.svg`
  animation: ${PieceDrop} 0.5s;
`;

export const XPiece: FC = () => <Piece value="X" color="red" />;
export const OPiece: FC = () => <Piece value="O" color="yellow" />;
export const XPieceAnimDrop: FC = () => <Piece value="X" color="red" />;
export const OPieceAnimDrop: FC = () => <Piece value="O" color="yellow" />;

export default Piece;
