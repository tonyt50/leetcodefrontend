import React, { FC } from "react";
import styled from "styled-components";
interface PieceProps {
  value?: "X" | "O";
  color?: "red" | "yellow";
  drop?: number | undefined;
}

// use a functional component, that has a styled component wrapping
export const Piece: FC<PieceProps> = ({ value, color, drop }) => {
  console.log("drop ", drop);
  const newDrop = drop;
  return (
    <StyledSVG height="30" width="30" drop={newDrop}>
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

const StyledSVG = styled.svg<PieceProps>`
  animation: pieceDrop 0.5s;

  @keyframes pieceDrop {
    from {
      transform: translateY(-${({ drop }) => drop}px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const XPiece: FC = () => <Piece value="X" color="red" />;
export const OPiece: FC = () => <Piece value="O" color="yellow" />;

export default Piece;
